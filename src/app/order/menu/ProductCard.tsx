import { Product } from "@/types/index";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductCardTrigger from "./ProductCardTrigger";
import ProductCardContent from "./ProductCardContent";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <ProductCardTrigger product={product} />
        </DialogTrigger>
        <DialogContent>
          <ProductCardContent product={product} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
