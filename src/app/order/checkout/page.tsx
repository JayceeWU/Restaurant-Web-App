import { getMyCart } from "@/lib/actions/cart.actions";
import { redirect } from "next/navigation";

const Checkout = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");
  return <div></div>;
};

export default Checkout;
