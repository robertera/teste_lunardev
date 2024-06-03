import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const cartIsEmpty = cartItems.length === 0;

    const handleBackClick = () => {
        navigate(-1);
    };

    const listVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <>
            <Header
                onPriceFilter={() => {}}
                onClearFilter={() => {}}
                setSearchTerm={() => {}}
                priceRange={null}
                showFilters={false}
            />
            <AnimatePresence>
            <motion.main className="p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            >
                <motion.button className="flex items-center text-green-500 my-2" onClick={handleBackClick}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <IoArrowBack size={24} />
                    <span className="ml-2">Voltar</span>
                </motion.button>
                <div className="p-4 flex flex-col lg:flex-row lg:justify-between">
                    <motion.div className="lg:w-3/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                    <h2 className="text-2xl mb-4">Carrinho de Compras</h2>
                    {cartIsEmpty ? (
                        <p>Seu carrinho está vazio.</p>
                    ) : (
                        <>
                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={listVariants}
                        >
                            {cartItems.map((item) => (
                                <motion.li key={item.id} variants={itemVariants} className="flex items-center justify-between mb-4 p-2 border-b">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.name} className="w-14 h-14 md:w-16 md:h-16 mr-4" />
                                        <div>
                                            <h3 className="text-sm md:text-lg">{item.name}</h3>
                                            <p className="text-sm">R${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className={`px-2 py-1 border rounded-l ${item.quantity > 1 ? ' text-green-500' : ' text-gray-500'}`}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="none"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                            className="w-16 py-1 text-center border outline-none" />
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 rounded-r border text-green-500"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded ml-4"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </motion.li>
                            ))}
                        </motion.ul>
                        <button onClick={clearCart} className='bg-red-500 text-white px-4 py-2 rounded flex flex-row'><FaRegTrashCan size={24} className='mr-2' />Limpar Carrinho</button>
                        </>
                        )}
                    </motion.div>
                    <motion.div className="lg:w-1/3 lg:ml-4 mt-4 lg:mt-0 p-4 border rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl mb-4">Resumo</h2>
                        {cartIsEmpty ? (
                            <p>Não há itens no carrinho.</p>
                        ) : (
                            <>
                                <p className="text-lg mb-4">Subtotal: R${getTotalPrice().toFixed(2)}</p>
                                <Link to="/checkout" className="block bg-green-500 text-white text-center px-4 py-2 rounded">
                                    Finalizar Compra
                                </Link>
                            </>
                        )}
                        <Link to="/" className="block bg-gray-500 text-white text-center px-4 py-2 rounded my-4">
                            Continuar Comprando
                        </Link>
                    </motion.div>
                </div>
            </motion.main>
            </AnimatePresence>
        </>
    );
};

export default CartPage;