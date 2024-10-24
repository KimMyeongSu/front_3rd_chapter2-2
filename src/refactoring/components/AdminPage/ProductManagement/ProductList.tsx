import { useState } from "react";
import { Product } from "../../../../types";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

const ProductList = ({ products, onProductUpdate }: Props) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          product={product}
          index={index}
          isOpen={openProductIds.has(product.id)}
          onToggle={() => toggleProductAccordion(product.id)}
          onProductUpdate={onProductUpdate}
        />
      ))}
    </div>
  );
};

export default ProductList;
