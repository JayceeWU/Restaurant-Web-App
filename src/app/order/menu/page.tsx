import ProductList from "./ProductList";
import CategoryNav from "@/components/shared/product/CategoryNav";
import FeatureItems from "./FeatureItems";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import CheckoutButton from "./CheckoutButton";

const OrderMenu = async () => {
  const allProducts = await getAllProducts();
  const allCategories = await getAllCategories();
  return (
    <div>
      <div className="md:flex md:gap-8 md:px-10 xl:px-28 mx-auto">
        <aside className="contents md:block md:w-30 lg:w-50 md:shrink-0">
          <CategoryNav
            categories={["Featured", ...allCategories]}
            fontAdj={false}
            centerText={false}
          />
        </aside>
        <main className="flex-1 min-w-0 space-y-6 md:py-8">
          <div id="section-featured">
            <FeatureItems
              products={allProducts.filter((product) => product.isFeatured)}
            />
          </div>
          {allCategories.map((category) => (
            <div
              id={`section-${category.toLowerCase().replace(/\s+/g, "-")}`}
              key={category}
            >
              <ProductList
                products={allProducts.filter(
                  (product) => product.category === category,
                )}
                category={category}
              />
            </div>
          ))}
        </main>
      </div>
      <CheckoutButton />
    </div>
  );
};

export default OrderMenu;
