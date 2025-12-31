import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductCardContent from "./ProductCardContent";
import Image from "next/image";
import { Product } from "@/types/index";
import ProductPrice from "./ProductPrice";
import AddToCart from "./AddToCartRound";

const FeatureItems = ({ products }: { products: Product[] }) => {
  return (
    <div className="container mx-auto">
      <h1
        className={`hidden md:block text-center md:pl-4 text-xl md:text-2xl uppercase font-medium tracking-wider`}
      >
        Featured Dishes
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full md:px-14"
      >
        <CarouselContent className="-ml-4">
          {products.map(
            (product) =>
              product.image && (
                <CarouselItem
                  key={product.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="p-1">
                        <Card className="border overflow-hidden hover:border-3 cursor-pointer">
                          <CardContent className="grid shrink-0">
                            <div className="col-start-1 row-start-1">
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
                              <div className="pt-2 text-left w-full">
                                <h2 className="text-m font-medium px-4">
                                  {product.name}
                                </h2>
                                <div className="flex gap-2 px-4 py-2">
                                  <ProductPrice value={Number(product.price)} />
                                  {product.subname && (
                                    <span className="opacity-60">
                                      {product.subname}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <AddToCart />
                          </CardContent>
                        </Card>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <ProductCardContent product={product} />
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ),
          )}
        </CarouselContent>
        <CarouselPrevious className="left-4 h-10 w-10 cursor-pointer dark:bg-background dark:hover:bg-foreground dark:hover:text-background" />
        <CarouselNext className="right-4 h-10 w-10 cursor-pointer dark:bg-background dark:hover:bg-foreground dark:hover:text-background" />
      </Carousel>
    </div>
  );
};

export default FeatureItems;
