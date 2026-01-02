import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getMyCart } from "@/lib/actions/cart.actions";
import { IoCartOutline } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ProductPrice from "@/components/shared/product/ProductPrice";
import AdjQty from "./AdjQty";
import { CartItem } from "@/types";

const CheckoutButton = async () => {
  const cart = await getMyCart();
  const cartItems = cart?.items;
  if (!cartItems || cartItems.length === 0) return null;
  return (
    <Drawer>
      <div className="fixed z-50 bottom-0 w-full">
        <DrawerTrigger asChild>
          <Button
            variant="default"
            className="w-full h-14 rounded-none hover:bg-amber-300 dark:hover:bg-amber-300 hover:text-black"
          >
            <div className="flex items-center gap-1">
              <span className="text-lg">View Cart</span>
              <IoCartOutline />
              <span className="text-sm">
                {cartItems?.reduce((a, c) => a + c.qty, 0)}
              </span>
            </div>
          </Button>
        </DrawerTrigger>
      </div>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-xl flex flex-col min-h-0">
          <DrawerHeader>
            <DrawerTitle aria-describedby="cart">Your Cart</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="overflow-y-auto border-y">
            <div className="m-4 pb-0">
              {cartItems?.map((item, index) => {
                return (
                  <div key={item.productId}>
                    <div className="p-2 flex justify-between">
                      <div className="flex flex-col justify-between">
                        <span>{item.product.name}</span>
                        {item.options && (
                          <div className="text-muted-foreground pl-2 text-sm">
                            Custimizations
                          </div>
                        )}
                        {/* <div className="text-muted-foreground pl-2 text-sm">Custimizations</div> */}
                        <AdjQty
                          item={{
                            productId: item.productId,
                            qty: item.qty,
                            options: item.options,
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <div className="relative h-10 w-10 mb-1">
                          {item.product.image && (
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="rounded-md object-cover"
                              loading="eager"
                              sizes="90px"
                            />
                          )}
                        </div>
                        <ProductPrice value={Number(item.product.price)} />
                      </div>
                    </div>
                    {index !== cartItems.length - 1 && <Separator />}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <DrawerFooter>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(cart.subtotal)}</span>
            </div>
            <DrawerClose asChild>
              <Link href="/order/checkout" className="w-full">
                <Button variant="default" className="w-full">
                  Checkout
                </Button>
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Continue Shopping</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckoutButton;
