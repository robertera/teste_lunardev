import React from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import productsData from "../data/products.json";
import Header from '../components/Header';
import { IoArrowBack } from "react-icons/io5";
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { MdAddShoppingCart, MdCheckCircle } from "react-icons/md";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = productsData.find((product) => product.id === id);
    const { addToCart } = useCart();
    const [confirmation, setConfirmation] = React.useState<boolean>(false);

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    const handleBackClick = () => {
        navigate(-1);
      };

      const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.img,
            quantity: 1,
        });
        setConfirmation(true);
        setTimeout(() => {
            setConfirmation(false);
        }, 1000);
    };

    return (
        <div>
            <Header
                onPriceFilter={() => { }}
                onClearFilter={() => { }}
                setSearchTerm={() => { }}
                priceRange={null}
                showFilters={false}
            />
            <main className="p-4">
                <button
                    className="flex items-center text-green-500 mb-4"
                    onClick={handleBackClick}
                    >
                    <IoArrowBack size={24} />
                    <span className="ml-2">Voltar</span>
                </button>
                <div className="p-6 flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col items-center gap-4 rounded w-full md:w-1/2 md:h-3/4">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-3/4 object-cover rounded-lg md:h-3/4"
                        />
                    </div>
                    <div className="flex flex-col justify-between w-full md:w-1/2">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                            <h4 className='text-sm font-extralight'>Código: {product.id}</h4>
                        </div>
                        <div>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <p className="text-gray-700 mb-4">Cor: {product.color}</p>
                        </div>
                        <div>
                            <p className="text-xl font-semibold text-gray-700 mb-4">R${product.price}</p>
                            <motion.button
                                onClick={handleAddToCart}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                whileTap={{ scale: 0.9 }}
                            >
                                {confirmation ? (
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductDetails;
