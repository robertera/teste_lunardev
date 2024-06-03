import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoArrowBack } from "react-icons/io5";
import { GiMoonOrbit } from 'react-icons/gi';
import { CiCreditCard1 } from "react-icons/ci";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart, getTotalPrice } = useCart();
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'boleto'>('creditCard');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handlePayment = () => {
        if (paymentMethod === 'creditCard' && (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv)) {
            alert('Por favor, preencha todos os campos do formulário de pagamento.');
            return;
        }

        let totalPrice = getTotalPrice();
        if (paymentMethod === 'boleto') {
            totalPrice *= 0.9; // Aplica desconto de 10% para pagamento com boleto
        }

        const randomNumber = Math.random();
        const paymentSuccess = randomNumber < 0.8;
        setPaymentSuccess(paymentSuccess);
        setShowSuccessMessage(true);

        if (paymentSuccess) {
            clearCart();
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    const formatCardNumber = (value: string) => {
        return value.replace(/\D/g, '').replace(/(\d{4})(\d)/g, '$1 $2').trim();
    };

    const formatExpiryDate = (value: string) => {
        return value.replace(/\D/g, '').replace(/(\d{2})(\d)/g, '$1/$2').trim();
    };

    return (
        <>
            {/* Cabeçalho */}
            <header className="flex flex-col sm:flex-row justify-between items-center bg-green-500 p-4">
                <Link to="/" className="flex flex-row gap-2 items-center mb-2 sm:mb-0" aria-label="Logo Lunar Shop">
                    <GiMoonOrbit size={42} color="#F2F2F2" aria-label="Logo Lunar Shop" />
                    <h1 className="text-3xl text-[#F2F2F2] font-semibold font-mono max-sm:hidden">Lunar Shop</h1>
                </Link>
            </header>
            {/* Conteúdo principal */}
            <main className="p-4">
                {/* Botão Voltar */}
                <button className="flex items-center text-green-500 my-2" onClick={() => navigate(-1)}>
                    <IoArrowBack size={24} />
                    <span className="ml-2">Voltar</span>
                </button>
                {/* Seção Checkout */}
                <div className="p-4 flex flex-col lg:flex-row lg:justify-between">
                    {/* Detalhes do Pagamento */}
                    <div className="lg:w-3/5">
                        {/* Título Checkout */}
                        <h2 className="text-2xl mb-4">Checkout</h2>
                        {/* Formulário de Pagamento */}
                        <div className="bg-white rounded-lg p-2">
                            {/* Opções de Pagamento */}
                            <div className="flex flex-row mb-4 right-0">
                                <button
                                    onClick={() => setPaymentMethod('creditCard')}
                                    className={`flex flex-row mr-2 p-2 border rounded focus:outline-none ${paymentMethod === 'creditCard' ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                                >
                                    <CiCreditCard1 size={24} className='mr-1' />Cartão de Crédito
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('boleto')}
                                    className={`flex flex-row p-2 border rounded focus:outline-none ${paymentMethod === 'boleto' ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                                >
                                   <LiaFileInvoiceDollarSolid size={24} className='mr-1' />Boleto
                                </button>
                            </div>
                            {/* Número do Cartão */}
                            {paymentMethod === 'creditCard' && (
                                <>
                                    {/* Número do Cartão */}
                                    <label className="block mb-2">
                                        Número do Cartão:
                                        <input
                                            type="text"
                                            placeholder="xxxx xxxx xxxx xxxx"
                                            maxLength={19}
                                            className="block w-full border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500"
                                        />
                                    </label>
                                    {/* Data de Validade (MM/YY) */}
                                    <label className="block mb-2">
                                        Data de Validade (MM/YY):
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            className="block w-full border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500"
                                        />
                                    </label>
                                    {/* CVV */}
                                    <label className="block mb-2">
                                        CVV:
                                        <input
                                            type="text"
                                            placeholder="123"
                                            maxLength={3}
                                            className="block w-full border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500"
                                        />
                                    </label>
                                </>
                            )}
                        </div>
                        {/* Botão Finalizar Compra */}
                        <button onClick={handlePayment} className="mt-4 ml-2 bg-green-500 text-white px-4 py-2 rounded">
                            Finalizar Compra
                        </button>
                        {/* Mensagem de Sucesso/Falha */}
                        {showSuccessMessage && (
                            <div className={`mt-4 p-4 rounded-lg ${paymentSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
                                {paymentSuccess ? 'Compra realizada com sucesso! Obrigado por sua compra.' : 'Falha ao processar o pagamento. Por favor, tente novamente.'}
                            </div>
                        )}
                    </div>
                    {/* Resumo */}
                    <div className="lg:w-1/3 lg:ml-4 mt-4 lg:mt-0 p-4 border rounded-lg">
                        {/* Título Resumo */}
                        <h2 className="text-2xl mb-4">Resumo</h2>
                        {/* Subtotal */}
                        <p className="text-lg mb-4">Subtotal: R${getTotalPrice().toFixed(2)}</p>
                        {/* Desconto para Boleto */}
                        {paymentMethod === 'boleto' && (
                            <p className="text-lg mb-4">Desconto (10%): -R${(getTotalPrice() * 0.1).toFixed(2)}</p>
                        )}
                        {/* Total */}
                        <p className="text-lg mb-4">Total: R${paymentMethod === 'boleto' ? (getTotalPrice() * 0.9).toFixed(2) : getTotalPrice().toFixed(2)}</p>
                        {/* Link para Continuar Comprando */}
                        <Link to="/" className="block bg-gray-500 text-white text-center px-4 py-2 rounded my-4">
                            Continuar Comprando
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default CheckoutPage;
