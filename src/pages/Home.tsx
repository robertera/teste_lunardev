import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";
import { GiMoonOrbit } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

const Home: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handlePriceFilter = (min: number, max: number) => {
        setPriceRange([min, max]);
        setIsDropdownOpen(false);
    };

    const clearFilter = () => {
        setPriceRange(null);
        setIsDropdownOpen(false);
    };

    return (
        <div>
            <header className="flex flex-col sm:flex-row justify-between items-center bg-green-500 p-4">
                <Link to="/" className="flex flex-row gap-2 items-center mb-2 sm:mb-0" aria-label="Logo Lunar Shop">
                    <GiMoonOrbit size={42} color="#F2F2F2" aria-label="Logo Luna Shop" />
                    <h1 className="text-3xl text-[#F2F2F2] font-semibold font-mono max-sm:hidden">Lunar Shop</h1>
                </Link>
                <div className="flex flex-row items-center">
                    <input
                        type="text"
                        placeholder="Buscar produto"
                        className="px-3 py-2 rounded border"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="relative">
                        <button className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <HiAdjustmentsHorizontal size={42} color="#F2F2F2" />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${priceRange && priceRange[0] === 0 && priceRange[1] === 50 ? "bg-gray-200" : ""}`}
                                    onClick={() => handlePriceFilter(0, 50)}>
                                    R$ 0 - R$ 50
                                </button>
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${priceRange && priceRange[0] === 51 && priceRange[1] === 100 ? "bg-gray-200" : "" }`}
                                    onClick={() => handlePriceFilter(51, 100)}>
                                    R$ 51 - R$ 100
                                </button>
                                <button
                                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${priceRange && priceRange[0] === 101 && priceRange[1] === 200 ? "bg-gray-200" : "" }`}
                                    onClick={() => handlePriceFilter(101, 200)}>
                                    R$ 101 - R$ 200
                                </button>
                                <button
                                    onClick={clearFilter}
                                    className="block w-full text-left px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-b-lg">
                                    Limpar Filtro
                                </button>
                            </div>
                        )}
                    </div>
                    <IoCartOutline size={40} color="#F2F2F2" />
                </div>
            </header>
            <main className="bg-[#F2F2F2]">
                <ProductList priceRange={priceRange} searchTerm={searchTerm} />
            </main>
        </div>
    );
};

export default Home;
