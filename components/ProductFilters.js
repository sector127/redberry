import { useState, useRef, useEffect } from "react";
import { Adjustments } from "@/lib/icons";

const ProductFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(filters.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || "");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePriceFilter = () => {
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;
    
    // Validate that min is not greater than max
    if (min && max && min > max) {
      alert("Minimum price cannot be greater than maximum price");
      return;
    }

    onFiltersChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
    setIsOpen(false);
  };


  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm 
            bg-white text-gray-700 border-gray-300 hover:border-gray-400"
      >
        <Adjustments />
        <span>Filter</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[392px] bg-white rounded-lg border border-gray-200 shadow-lg z-50">
          <div className="p-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">Select price</h3>

            {/* Price Range Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="From *"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="To *"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex justify-between items-center">
                <div></div>
              <button
                onClick={handlePriceFilter}
                className="w-[124] bg-redberryRed hover:bg-orange-600 text-white py-3 px-4 rounded-md text-sm font-medium transition-colors mt-4 cursor-pointer"
              >
                Apply
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;