"use client";

import { Minus, Plus } from "lucide-react";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AdjQty = ({ item }: { item: CartItem }) => {
  const handleAdd = async () => {
    const res = await addItemToCart(item);
    if (!res.success) toast.error(res.message);
  };
  const handleRemove = async () => {
    const res = await removeItemFromCart(item.productId);
    if (!res.success) toast.error(res.message);
  };
  return (
    <div className="flex gap-2 text-sm items-center pt-2">
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 rounded-full"
        onClick={handleRemove}
      >
        <Minus size={13} />
      </Button>
      <span className="w-4 text-center">{item.qty}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 rounded-full"
        onClick={handleAdd}
      >
        <Plus size={13} />
      </Button>
    </div>
  );
};

export default AdjQty;
