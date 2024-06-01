import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import productsData from '../data/products.json';
import { MdAddShoppingCart } from "react-icons/md";

interface ProductListProps {
    priceRange: [number, number] | null;
    searchTerm: string;
  }

  const ProductList: React.FC<ProductListProps> = ({ priceRange, searchTerm  }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() =>{
        setProducts(productsData);
    }, []);

    //TODO
    const addToCart = (product: Product) => {
        console.log(`Produto "${product.name}" adicionado ao carrinho.`);
    };

    const filteredProducts = products.filter(product => {
        const matchesPriceRange = priceRange ? product.price >= priceRange[0] && product.price <= priceRange[1] : true;
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPriceRange && matchesSearchTerm;
    });

return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
      {filteredProducts.map(product => (
        <div key={product.id} className="border p-3 rounded shadow-sm">
          <img src={product.img} alt={product.name} className="h-42 w-full object-cover mb-4"/>
          <h2 className="text-xl font-bold font-mono mb-2">{product.name}</h2>
          <p className="text-lg font-semibold mt-2">R${product.price}</p>
          <button onClick={() => addToCart(product)} className="flex flex-row items-center gap-2 bg-green-500 text-white px-4 py-2 rounded mt-2">
            <MdAddShoppingCart size={24} color="#F2F2F2" />Adicionar ao carrinho
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;