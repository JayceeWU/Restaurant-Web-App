import Image from "next/image";
import { Product } from "@/types/index";
import ProductPrice from "./ProductPrice";
import AddToCartRound from "./AddToCartRound";

const ProductCardTrigger = ({ product }: { product: Product }) => {
  return (
    <div className="m-1 overflow-hidden rounded-lg border bg-background hover:border-3 shadow-2xs cursor-pointer">
      <div className="grid grid-cols-[1fr_auto] items-center">
        <div className="pt-2 text-left w-full">
          <h2 className="text-m font-medium px-4">{product.name}</h2>
          <div className="flex gap-2 px-4 py-2">
            <ProductPrice value={Number(product.price)} />
            {product.subname && (
              <span className="opacity-60">{product.subname}</span>
            )}
          </div>
        </div>

        <div className="grid shrink-0 p-2">
          {product.image && (
            <div className="col-start-1 row-start-1 relative h-20 w-20 overflow-hidden rounded-md mb-3 mr-3">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                loading="eager"
                sizes="90px"
              />
            </div>
          )}
          <AddToCartRound />
        </div>
      </div>
    </div>
  );
};

export default ProductCardTrigger;
