import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { GiMoonOrbit } from 'react-icons/gi';
import { FaRegTrashCan } from "react-icons/fa6";

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
    const cartIsEmpty = cartItems.length === 0;

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            <header className="flex flex-col sm:flex-row justify-between items-center bg-green-500 p-4">
                <Link to="/" className="flex flex-row gap-2 items-center mb-2 sm:mb-0" aria-label="Logo Lunar Shop">
                    <GiMoonOrbit size={42} color="#F2F2F2" aria-label="Logo Lunar Shop" />
                    <h1 className="text-3xl text-[#F2F2F2] font-semibold font-mono max-sm:hidden">Lunar Shop</h1>
                </Link>
            </header>
            <main className="p-4">
                <button className="flex items-center text-green-500 my-2" onClick={handleBackClick}>
                    <IoArrowBack size={24} />
                    <span className="ml-2">Voltar</span>
                </button>
                <div className="p-4 flex flex-col lg:flex-row lg:justify-between">
                    <div className="lg:w-3/5">
                        <h2 className="text-2xl mb-4">Carrinho de Compras</h2>
                        {cartIsEmpty ? (
                            <p>
                                Seu carrinho está vazio.
                            </p>
                        ) : (
                            <ul>
                                {cartItems.map((item) => (
                                    <><li key={item.id} className="flex items-center justify-between mb-4 p-2 border-b">
                                        <div className="flex items-center">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                                            <div>
                                                <h3 className="text-lg">{item.name}</h3>
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
                                    </li>
                                    <button onClick={clearCart} className='bg-red-500 text-white px-4 py-2 rounded flex flex-row'><FaRegTrashCan size={24} className='mr-2' />Limpar Carrinho</button></>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="lg:w-1/3 lg:ml-4 mt-4 lg:mt-0 p-4 border rounded-lg">
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
                    </div>
                </div>
            </main></>
    );
};

export default CartPage;