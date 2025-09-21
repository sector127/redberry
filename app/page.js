"use client";
import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { useState, useMemo } from "react";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("-created_at");
  const [filters, setFilters] = useState({
    minPrice: null,
    maxPrice: null,
  });

  // Build API URL with query parameters
  const buildApiUrl = () => {
    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    params.append("sort", sortBy);

    if (filters.minPrice) {
      params.append("filter[price_from]", filters.minPrice.toString());
    }
    if (filters.maxPrice) {
      params.append("filter[price_to]", filters.maxPrice.toString());
    }

    return `https://api.redseam.redberryinternship.ge/api/products?${params.toString()}`;
  };

  // Fetch data with SWR
  const { data, error, isLoading } = useSWR(buildApiUrl(), fetcher);

  // Filter products client-side as fallback
  const filteredProducts = useMemo(() => {
    if (!data?.data) return [];

    let filtered = data.data;

    // Apply price filters
    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter((product) => {
        const price = product.price;
        const minCheck = !filters.minPrice || price >= filters.minPrice;
        const maxCheck = !filters.maxPrice || price <= filters.maxPrice;
        return minCheck && maxCheck;
      });
    }

    // Sort products (client-side fallback, API should handle this)
    switch (sortBy) {
      case "price":
        return filtered.sort((a, b) => a.price - b.price);
      case "-price":
        return filtered.sort((a, b) => b.price - a.price);
      case "created_at":
        return filtered.sort((a, b) => {
          // Fallback: sort by release year and ID if no created_at field
          const yearA = parseInt(a.release_year) || 0;
          const yearB = parseInt(b.release_year) || 0;
          if (yearA !== yearB) {
            return yearA - yearB;
          }
          return a.id - b.id;
        });
      case "-created_at":
      default:
        return filtered.sort((a, b) => {
          // Fallback: sort by release year and ID if no created_at field
          const yearA = parseInt(a.release_year) || 0;
          const yearB = parseInt(b.release_year) || 0;
          if (yearA !== yearB) {
            return yearB - yearA;
          }
          return b.id - a.id;
        });
    }
  }, [data?.data, filters, sortBy]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({
      minPrice: null,
      maxPrice: null,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSortDisplayText = (value) => {
    switch (value) {
      case "-created_at":
        return "Sort by";
      case "created_at":
        return "Oldest First";
      case "price":
        return "Price: Low to High";
      case "-price":
        return "Price: High to Low";
      default:
        return "Sort by";
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">
            Failed to load products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-25 mx-auto py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>

          {/* Sort and Filter Controls */}
          <div className="flex items-center gap-3">
            <p className="text-darkBlue text-sm">
              {data?.meta?.total
                ? `Showing ${data.meta.from}-${data.meta.to} of ${data.meta.total} products`
                : "Loading..."}
            </p>
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters}
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-none shadow-none text-darkBlue m-0 p-0">
                <SelectValue placeholder="Sort by">
                  {getSortDisplayText(sortBy)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <p className="font-semibold text-darkBlue p-2">Sort by</p>
                <SelectItem value="-created_at">New products First</SelectItem>
                <SelectItem value="created_at">Old products First</SelectItem>
                <SelectItem value="price">Price, Low to High</SelectItem>
                <SelectItem value="-price">Price, High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(filters.minPrice || filters.maxPrice) && (
          <div className="mb-6">
            <div className="flex items-center justify-between bg-white p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {(filters.minPrice || filters.maxPrice) && (
                    <div className="flex items-center border border-formGrey px-3 py-1 rounded-full text-sm">
                      <span>Price: </span>
                      {filters.minPrice && `$${filters.minPrice}`}
                      {filters.minPrice && filters.maxPrice && " - "}
                      {filters.maxPrice && `$${filters.maxPrice}`}
                      <button
                        onClick={clearFilters}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* No Products Found */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                No products match your current filters. Try adjusting your price
                range or clearing all filters.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {data?.meta && filteredProducts.length > 0 && (
          <Pagination
            currentPage={data.meta.current_page}
            totalPages={data.meta.last_page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}