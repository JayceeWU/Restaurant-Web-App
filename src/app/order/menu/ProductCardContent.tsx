"use client";
import Image from "next/image";
import { Product } from "@/types/index";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AddToCartFooter from "./AddToCartFooter";
import ProductPrice from "@/components/shared/product/ProductPrice";
import CustomizationOptions from "./CustomizationOptions";

const ProductCardContent = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col max-h-[85vh]">
      <DialogHeader className="sticky top-0 z-10 pb-4">
        <DialogTitle className="uppercase">{product.name}</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto flex-1 pr-2">
        {product.image && (
          <div className="relative w-full h-48 overflow-hidden mb-4">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              loading="eager"
              sizes="960px"
            />
          </div>
        )}
        <DialogDescription className="flex flex-col">
          <ProductPrice value={Number(product.price)} />
          {product.subname && <span>{product.subname}</span>}
          {product.description && <span>{product.description}</span>}
        </DialogDescription>
        {product.customizations && <CustomizationOptions product={product} />}
      </div>
      <AddToCartFooter
        item={{
          productId: product.id,
          qty: 1,
        }}
      />
    </div>
  );
};

export default ProductCardContent;
