import ProductCard from "./ProductCard";
import { Product } from "@/types";

const ProductList = ({
  products,
  category,
}: {
  products: Product[];
  category: string;
}) => {
  return (
    <div className="container mx-auto">
      <h1 className={`px-4 text-xl uppercase font-medium tracking-wider`}>
        {category}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
