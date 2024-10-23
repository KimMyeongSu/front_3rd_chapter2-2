import { Coupon } from "../../types.ts";
import { useState } from "react";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  const addCoupon = (coupon: Coupon): void => {
    setCoupons((prevCoupons) => prevCoupons.concat(coupon));
  };

  return { coupons, addCoupon };
};
