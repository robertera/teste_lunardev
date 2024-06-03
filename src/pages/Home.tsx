import React, { useState } from "react";
import ProductList from "../components/ProductList";
import Header from "../components/Header";

const Home: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handlePriceFilter = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const clearFilter = () => {
    setPriceRange(null);
  };

  return (
    <div>
      <Header
        onPriceFilter={handlePriceFilter}
        onClearFilter={clearFilter}
        setSearchTerm={setSearchTerm}
        priceRange={priceRange}
        showFilters={true}
      />
      <main className="bg-[#F2F2F2] h-[100vw]">
        <ProductList priceRange={priceRange} searchTerm={searchTerm} />
      </main>
    </div>
  );
};

export default Home;
