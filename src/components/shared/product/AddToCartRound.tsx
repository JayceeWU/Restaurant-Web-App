import { MdAdd } from "react-icons/md";
import { Button } from "@/components/ui/button";
const AddToCartRound = () => {
  return (
    <div className="col-start-1 row-start-1 z-10 self-end justify-self-end">
      <Button
        variant="ghost"
        className="h-10 w-10 rounded-full shadow-sm cursor-pointer bg-background border-2 hover:bg-amber-300 dark:hover:bg-amber-300 dark:hover:text-black"
      >
        <MdAdd />
      </Button>
    </div>
  );
};

export default AddToCartRound;
