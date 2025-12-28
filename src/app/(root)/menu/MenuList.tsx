import MenuCard from "./MenuCard";
import { Product } from "@/types";
import { Cormorant_Garamond } from "next/font/google";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "600",
});
const MenuList = ({
  products,
  category,
}: {
  products: Product[];
  category: string;
}) => {
  return (
    <div className="container mx-auto">
      {category === "Featured" ? (
        <h1
          className={`hidden md:block md:text-left md:pl-4 text-center text-xl md:text-2xl uppercase font-bold tracking-wider ${cormorant.className}`}
        >
          {category}
        </h1>
      ) : (
        <h1
          className={`text-center md:text-left md:pl-4 text-xl md:text-2xl uppercase font-bold tracking-wider ${cormorant.className}`}
        >
          {category}
        </h1>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <MenuCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
};
export default MenuList;
