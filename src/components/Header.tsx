import React, { useState } from "react";
import { useCart } from '../context/CartContext';
import { Link } from "react-router-dom";
import { GiMoonOrbit } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

interface HeaderProps {
  onPriceFilter: (min: number, max: number) => void;
  onClearFilter: () => void;
  setSearchTerm: (term: string) => void;
  priceRange: [number, number] | null;
}

const Header: React.FC<HeaderProps> = ({ onPriceFilter, onClearFilter, setSearchTerm, priceRange}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTermState] = useState<string>("");
  const { cartItemCount } = useCart();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTermState(value);
    setSearchTerm(value);
  };

  const handlePriceFilter = (min: number, max: number) => {
    onPriceFilter(min, max);
    setIsDropdownOpen(false);
  };

  const handleClearFilter = () => {
    onClearFilter();
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-green-500 p-4">
      <Link to="/" className="flex flex-row gap-2 items-center mb-2 sm:mb-0" aria-label="Logo Lunar Shop">
        <GiMoonOrbit size={42} color="#F2F2F2" aria-label="Logo Lunar Shop"/>
        <h1 className="text-3xl text-[#F2F2F2] font-semibold font-mono max-sm:hidden">Lunar Shop</h1>
      </Link>
      <div className="flex flex-row items-center">
        <input
          type="text"
          placeholder="Buscar produto"
          className="px-3 py-2 rounded border"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="relative">
          <button
            className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <HiAdjustmentsHorizontal size={42} color="#F2F2F2" />
          </button>
          {isDropdownOpen && (
            <div className="flex flex-col items-center absolute right-0 mt-2 px-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
              <button
                className={`block w-full text-left px-4 py-2 mt-2 hover:bg-gray-100 ${priceRange && priceRange[0] === 0 && priceRange[1] === 50 ? 'bg-gray-200' : ''}`}
                onClick={() => handlePriceFilter(0, 50)}
              >
                R$0 - R$ 50
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${priceRange && priceRange[0] === 51 && priceRange[1] === 100 ? 'bg-gray-200' : ''}`}
                onClick={() => handlePriceFilter(51, 100)}
              >
                R$51 - R$ 100
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${priceRange && priceRange[0] === 101 && priceRange[1] === 200 ? 'bg-gray-200' : ''}`}
                onClick={() => handlePriceFilter(101, 200)}
              >
                R$101 - R$ 200
              </button>
              <button onClick={handleClearFilter} className="bg-red-500 text-white rounded px-4 py-2 my-2">
                Limpar Filtro
              </button>
            </div>
          )}
        </div>
        <Link to="/cart" className="p-2">
        <IoCartOutline size={40} color="#F2F2F2" />
        {cartItemCount > 0 && (
          <span className="absolute top-16 right-5 sm:top-3 sm:right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
            {cartItemCount}
          </span>
        )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
