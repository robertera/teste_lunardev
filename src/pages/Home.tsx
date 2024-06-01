import React, { useState } from "react";
import ProductList from "../components/ProductList";
import { GiMoonOrbit } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

const Home: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const handlePriceFilter = (min: number, max: number) => {
    setPriceRange([min, max]);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <header className="flex justify-between items-center bg-green-500 p-4">
        <div className="flex flex-row gap-2 items-center">
          <GiMoonOrbit size={42} color="#F2F2F2" />
          <h1 className="text-3xl text-[#F2F2F2] font-semibold font-mono max-sm:hidden">Lunar Shop</h1>
        </div>
        <div className="flex flex-row items-center">
          <div className="relative">
            <button className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <HiAdjustmentsHorizontal size={42} color="#F2F2F2" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handlePriceFilter(0, 50)}>
                  R$ 0 - R$ 50
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handlePriceFilter(51, 100)}>
                  R$ 51 - R$ 100
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handlePriceFilter(101, 200)}>
                  R$ 101 - R$ 200
                </button>
              </div>
            )}
          </div>
          <IoCartOutline size={40} color="#F2F2F2" />
        </div>
      </header>
      <main className="flex bg-[#F2F2F2]">
        <ProductList />
      </main>
    </div>
  );
};

export default Home;
