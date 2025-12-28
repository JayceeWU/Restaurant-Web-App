import Image from "next/image";
import { Product } from "@/types/index";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Cormorant_Garamond } from "next/font/google";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "600",
});

const MenuCard = ({ product }: { product: Product }) => {
  return (
    <div>
      {product.image && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="m-4 flex flex-col items-center overflow-hidden hover:scale-105 cursor-pointer">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  loading="eager"
                  sizes="960px"
                />
              </div>

              <div className="flex flex-col">
                <div className="pt-2 text-center">
                  <h2
                    className={`text-m md:text-xl font-bold tracking-wider ${cormorant.className}`}
                  >
                    {product.name}
                  </h2>
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="uppercase">{product.name}</DialogTitle>
              <div className="relative aspect-square w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  loading="eager"
                  sizes="960px"
                />
              </div>
              {product.description && (
                <DialogDescription>
                  <span className="block font-bold">{product.nameChinese}</span>
                  <span>{product.description}</span>
                </DialogDescription>
              )}
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MenuCard;
