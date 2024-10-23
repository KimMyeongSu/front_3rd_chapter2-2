import { CartItem, Coupon } from "../../../types";

export const calculateItemTotal = (item: CartItem): number => {
  return (
    item.product.price * item.quantity * (1 - getMaxApplicableDiscount(item))
  );
};

export const getMaxApplicableDiscount = ({
  product,
  quantity,
}: CartItem): number => {
  const { discounts } = product;
  let appliedDiscount = 0;

  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }

  return appliedDiscount;
};

export const calculateCartTotal = (
  items: CartItem[],
  selectedCoupon: Coupon | null
): {
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalDiscount: number;
} => {
  const totalBeforeDiscount = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const totalItem = items.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  const totalAfterDiscount = !selectedCoupon
    ? totalItem
    : selectedCoupon.discountType === "amount"
    ? totalItem - selectedCoupon.discountValue
    : (totalItem * (100 - selectedCoupon.discountValue)) / 100;

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

export const updateCartItemQuantity = (
  items: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity === 0) {
    return items.filter((item) => item.product.id !== productId);
  }

  return items.map((item) =>
    item.product.id === productId
      ? { ...item, quantity: Math.min(item.product.stock, newQuantity) }
      : item
  );
};
