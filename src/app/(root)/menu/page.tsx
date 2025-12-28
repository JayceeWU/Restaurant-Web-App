import MenuList from "./MenuList";
import { getAllProducts } from "@/lib/actions/product.actions";
import { MENU_CATEGORIES } from "@/lib/constants";
import CategoryNav from "./CategoryNav";

export const metadata = {
  title: "Menu",
};

const Menu = async () => {
  const allProducts = await getAllProducts();
  return (
    <div className="md:flex md:gap-8 md:px-10 xl:px-28 mx-auto">
      <aside className="contents md:block md:w-60 md:shrink-0">
        <CategoryNav categories={["Featured", ...MENU_CATEGORIES]} />
      </aside>
      <main className="flex-1 space-y-12 md:py-8">
        <div id="section-featured">
          <MenuList
            products={allProducts.filter((product) => product.isFeatured)}
            category="Featured"
          />
        </div>
        {MENU_CATEGORIES.map((category) => (
          <div
            id={`section-${category.toLowerCase().replace(/\s+/g, "-")}`}
            key={category}
          >
            <MenuList
              products={allProducts.filter(
                (product) => product.category === category,
              )}
              category={category}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Menu;
