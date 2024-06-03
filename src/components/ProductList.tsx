import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import productsData from '../data/products.json';
import { MdAddShoppingCart, MdCheckCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductListProps {
    priceRange: [number, number] | null;
    searchTerm: string;
  }

  const ProductList: React.FC<ProductListProps> = ({ priceRange, searchTerm  }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [confirmation, setConfirmation] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() =>{
        setProducts(productsData);
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesPriceRange = priceRange ? product.price >= priceRange[0] && product.price <= priceRange[1] : true;
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPriceRange && matchesSearchTerm;
    });

    const handleAddToCart = (product: Product) => {
      addToCart({ id: product.id, name: product.name, price: product.price, image: product.img, quantity: 1 });
      setConfirmation(product.id);

      setTimeout(() => {
          setConfirmation(null);
      }, 1000);
  };

return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-3">
      {filteredProducts.map(product => (
        <motion.div key={product.id} className="bg-white flex flex-col items-center border p-3 rounded shadow-sm" 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        >
          <Link to={`/product/${product.id}`} className="block mb-4">
          <img src={product.img} alt={product.name} className="h-40 w-40 object-cover mb-4 rounded-md"/>
          <h2 className="flex justify-center text-xl font-extralight mb-2">{product.name}</h2>
          <p className="flex justify-center text-lg font-semibold mt-2">R$ {product.price.toFixed(2)}</p>
          </Link>
          <motion.button onClick={() => handleAddToCart(product)} className="flex flex-row items-center gap-2 bg-green-500 text-white px-4 py-2 rounded mt-2"
          whileTap={{ scale: 0.9 }}
          >
            {confirmation === product.id ? (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-2"
                            >
                                <MdCheckCircle size={24} color="#F2F2F2" />
                                Adicionado!
                            </motion.div>
                        ) : (
                            <motion.div className="flex items-center gap-2">
                                <MdAddShoppingCart size={24} color="#F2F2F2" />
                                Adicionar ao carrinho
                            </motion.div>
                        )}
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductList;