interface ProductSpecificationsProps {
  specifications?: Record<string, string>;
}

export default function ProductSpecifications({ specifications = {} }: ProductSpecificationsProps) {
  return (
    <div className="space-y-2">
      {/* Product Technical / Craft Specifications */}
    </div>
  );
}
