const CustomizationPrice = ({ value }: { value: number }) => {
  // Ensure two decimal places
  const stringValue = value.toFixed(2);
  // Get the int/float
  const [intValue, floatValue] = stringValue.split(".");
  return (
    <span className="inline-block">
      <span className="text-xs">+</span>
      <span className="text-sm">{intValue}</span>
      <span className="text-xs">.{floatValue}</span>
    </span>
  );
};

export default CustomizationPrice;
