"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import { Button } from "@/components/ui/button";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "600",
});

interface CategoryNavProps {
  categories: string[];
}

const CategoryNav = ({ categories }: CategoryNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Featured");
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-120px 0px -70% 0px",
      threshold: 0,
    };
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace("section-", "");
          setActiveCategory(id === "featured" ? "Featured" : id);
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    categories.forEach((cat) => {
      const el = document.getElementById(
        `section-${cat.toLowerCase().replace(/\s+/g, "-")}`,
      );
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  const scrollToSection = (category: string) => {
    const id = `section-${category.toLowerCase().replace(/\s+/g, "-")}`;
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <div className="sticky top-16 z-40 w-full bg-background border-b md:border-none text-xl">
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-50 flex items-center bg-background justify-center md:justify-start w-full gap-4 pl-6 py-4 font-bold uppercase cursor-pointer ${cormorant.className}`}
      >
        <span className="md:hidden">{activeCategory}</span>
        <span className="md:hidden">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      <div
        className={`
        ${isOpen ? "block" : "hidden"} 
        md:block md:static md:shadow-none md:border-none md:max-h-none 
        z-50 absolute w-full bg-background 
        shadow-2xl max-h-[70vh] overflow-y-auto border
      `}
      >
        <ul className="py-3 space-y-1">
          {categories.map((category) => {
            const isActive =
              activeCategory.toLowerCase() === category.toLowerCase();
            return (
              <li key={category}>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(category)}
                  className={`
                  w-full justify-start text-xl cursor-pointer 
                  ${cormorant.className}
                  ${isActive ? "border border-stone-400" : ""}
                  `}
                >
                  {category}
                </Button>
              </li>
            );
          })}
        </ul>
        <div className="px-6 py-6 text-[11px] text-stone-500 border-t italic">
          Please note that our dishes are prepared fresh using shared cooking
          equipment. Cross-contact with allergens may occur.
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
