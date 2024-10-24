import { useState } from "react";
import { Product } from "../../../../types";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

interface Props {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

const ProductManagement = ({
  products,
  onProductUpdate,
  onProductAdd,
}: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <ProductForm
          onProductAdd={onProductAdd}
          onCancel={() => setShowNewProductForm(false)}
        />
      )}
      <ProductList products={products} onProductUpdate={onProductUpdate} />
    </div>
  );
};

export default ProductManagement;
