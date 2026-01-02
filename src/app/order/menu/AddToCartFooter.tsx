import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Plus, Loader } from "lucide-react";
import { CartItem } from "@/types";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

const AddToCartFooter = ({ item }: { item: CartItem }) => {
  const [isPending, startTransition] = useTransition();
  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
    });
  };
  return (
    <DialogFooter className="sticky z-10 pt-4">
      <DialogClose asChild>
        <Button
          className="w-full hover:bg-amber-300 dark:hover:bg-amber-300 hover:text-black cursor-pointer"
          onClick={handleAddToCart}
        >
          {" "}
          {isPending ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Add to Cart
        </Button>
      </DialogClose>
    </DialogFooter>
  );
};

export default AddToCartFooter;
