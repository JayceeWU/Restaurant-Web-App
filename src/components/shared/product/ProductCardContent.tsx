"use client";
import Image from "next/image";
import { Product } from "@/types/index";
import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { TiTick } from "react-icons/ti";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import AddToCartFooter from "./AddToCartFooter";
import ProductPrice from "./ProductPrice";
import CustomizationPrice from "./CustomizationPrice";

const ProductCardContent = ({ product }: { product: Product }) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const handleOptionSelect = (
    customizationName: string,
    optionName: string,
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [customizationName]: optionName,
    }));
  };
  return (
    <div className="flex flex-col max-h-[85vh]">
      <DialogHeader className="sticky top-0 z-10 pb-4">
        <DialogTitle className="uppercase">{product.name}</DialogTitle>
      </DialogHeader>
      <div className="overflow-y-auto flex-1 pr-2">
        <div className="flex flex-col">
        {product.image && (
          <div className="relative w-full h-48 overflow-hidden mb-4">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              loading="eager"
              sizes="960px"
            />
          </div>
        )}
          <ProductPrice value={Number(product.price)} />
          {product.subname && <span>{product.subname}</span>}
          {product.description && <span>{product.description}</span>}
        </div>
        {product.customizations && (
          <Accordion type="single" collapsible className="w-full">
            {product.customizations.map((c) => (
              <AccordionItem key={c.name} value={c.name}>
                <AccordionTrigger>
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <span>{c.name}</span>
                      <span className="text-muted-foreground">{c.subname}</span>
                    </div>
                    <div className="flex gap-2 text-muted-foreground">
                      <span>
                        {selectedOptions[c.name] || "Select an option"}
                      </span>
                      <span>
                        {c.required && !selectedOptions[c.name] && (
                          <span className="text-destructive">(Required)</span>
                        )}
                      </span>
                      <span>
                        {c.required && selectedOptions[c.name] && (
                          <span className="flex">
                            {" "}
                            <TiTick size={21} />
                            {` Required`}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col">
                  {c.options.map((option, index) => (
                    <div
                      key={option.name}
                      onClick={() => handleOptionSelect(c.name, option.name)}
                      className="flex flex-col"
                    >
                      <div className="flex items-center gap-3 p-3">
                        <Checkbox id={option.name} />
                        <Label htmlFor={option.name} className="w-full">
                          <div className="flex justify-between w-full">
                            <span className="text-sm">
                              {option.name}
                              {` `}
                              {option.subname}
                            </span>
                            {Number(option.additionalPrice) > 0 && (
                              <CustomizationPrice
                                value={Number(option.additionalPrice)}
                              />
                            )}
                          </div>
                        </Label>
                      </div>
                      {index !== c.options.length - 1 && <Separator />}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
      <AddToCartFooter
        item={{
          productId: product.id,
          qty: 1,
        }}
      />
    </div>
  );
};

export default ProductCardContent;
