import { useState } from "react";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white w-[412px] h-[614px] cursor-pointer">
      <div className="relative aspect-square overflow-hidden w-[412] h-[549px] mb-3">
        {!imageError ? (
          <Image
            src={product.cover_image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}

      </div>

      <div className="h-[53]">
        <div className="flex flex-col justify-between items-start">
          <h3 className="font-medium text-darkBlue text-lg line-clamp-1 capitalize pr-2">
            {product.name}
          </h3>
          <div className="text-base font-medium text-darkBlue">
            ${product.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;