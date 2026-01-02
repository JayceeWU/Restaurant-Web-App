import CustomizationPrice from "./CustomizationPrice";
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
import { Product } from "@/types/index";

const CustomizationOptions = ({ product }: { product: Product }) => {
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
    <Accordion type="single" collapsible className="w-full">
      {product.customizations?.map((c) => (
        <AccordionItem key={c.name} value={c.name}>
          <AccordionTrigger>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <span>{c.name}</span>
                <span className="text-muted-foreground">{c.subname}</span>
              </div>
              <div className="flex gap-2 text-muted-foreground">
                <span>{selectedOptions[c.name] || "Select an option"}</span>
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
              <div key={option.name} className="flex flex-col">
                <div className="flex items-center gap-3 p-3">
                  <Checkbox
                    id={option.name}
                    onClick={() => handleOptionSelect(c.name, option.name)}
                  />
                  <Label
                    htmlFor={option.name}
                    className="w-full"
                    onClick={() => handleOptionSelect(c.name, option.name)}
                  >
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
  );
};

export default CustomizationOptions;
