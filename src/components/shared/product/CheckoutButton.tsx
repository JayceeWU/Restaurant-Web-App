// import * as React from "react"
// import { Minus, Plus } from "lucide-react"
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

const CheckoutButton = async () => {
  const cart = await getMyCart();
  const cartItems = cart?.items;
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">
          <IoCartOutline />
          View Cart · {cartItems?.reduce((a, c) => a + c.qty, 0)}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle aria-describedby="cart">Your Cart</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-20">
            <div className="p-4 pb-0">
              {cartItems?.map((item) => (
                <div key={item.productId} className="border-b p-2">
                  <span>{item.productId}</span>
                  <span>{item.qty}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DrawerFooter>
            Subtotal {formatCurrency(1000099.99)}
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
