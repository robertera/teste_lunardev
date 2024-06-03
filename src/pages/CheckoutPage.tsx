import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoArrowBack } from "react-icons/io5";
import { CiCreditCard1 } from "react-icons/ci";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import Header from '../components/Header';
import { motion, AnimatePresence } from 'framer-motion';

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
            totalPrice *= 0.9;
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

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentDetails({
            ...paymentDetails,
            cardNumber: formatCardNumber(e.target.value)
        });
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentDetails({
            ...paymentDetails,
            expiryDate: formatExpiryDate(e.target.value)
        });
    };

    const containerVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, when: 'beforeChildren', staggerChildren: 0.3 }
        },
        exit: { opacity: 0, x: -50, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            {/* Cabeçalho */}
            <Header
                onPriceFilter={() => {}}
                onClearFilter={() => {}}
                setSearchTerm={() => {}}
                priceRange={null}
                showFilters={false}
            />
            {/* Conteúdo principal */}
            <AnimatePresence>
                <motion.main className="p-4"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                >
                    {/* Botão Voltar */}
                    <button className="flex items-center text-green-500 my-2" onClick={() => navigate(-1)}>
                        <IoArrowBack size={24} />
                        <span className="ml-2">Voltar</span>
                    </button>
                    {/* Seção Checkout */}
                    <div className="p-4 flex flex-col lg:flex-row lg:justify-between">
                        {/* Detalhes do Pagamento */}
                        <motion.div className="lg:w-3/5">
                            {/* Título Checkout */}
                            <h2 className="text-2xl mb-4">Checkout</h2>
                            {/* Formulário de Pagamento */}
                            <div className="bg-white rounded-lg p-2">
                                {/* Opções de Pagamento */}
                                <div className="flex flex-row mb-4 right-0">
                                    <motion.button
                                        variants={itemVariants}
                                        onClick={() => setPaymentMethod('creditCard')}
                                        className={`flex flex-row mr-2 p-2 border rounded focus:outline-none ${paymentMethod === 'creditCard' ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                                    >
                                        <CiCreditCard1 size={24} className='mr-1' />Cartão de Crédito
                                    </motion.button>
                                    <motion.button
                                        variants={itemVariants}
                                        onClick={() => setPaymentMethod('boleto')}
                                        className={`flex flex-row p-2 border rounded focus:outline-none ${paymentMethod === 'boleto' ? 'bg-green-500 text-white' : 'border-gray-300'}`}
                                    >
                                        <LiaFileInvoiceDollarSolid size={24}
                                        className='mr-1' />Boleto
                                    </motion.button>
                                </div>
                                {/* Número do Cartão */}
                                {paymentMethod === 'creditCard' && (
                                    <>
                                        <motion.label variants={itemVariants} className="block mb-2">
                                            Número do Cartão:
                                            <input
                                                type="text"
                                                placeholder="xxxx xxxx xxxx xxxx"
                                                maxLength={19}
                                                value={paymentDetails.cardNumber}
                                                onChange={handleCardNumberChange}
                                                className="block w-full border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500"
                                            />
                                        </motion.label>
                                        {/* Data de Validade (MM/YY) */}
                                        <motion.label variants={itemVariants} className="block mb-2">
                                            Data de Validade (MM/YY):
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                maxLength={5}
                                                value={paymentDetails.expiryDate}
                                                onChange={handleExpiryDateChange}
                                                className="block w-full border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500"
                                            />
                                        </motion.label>
                                        {/* CVV */}
                                        <motion.label variants={itemVariants} className="block mb-2">
                                            CVV:
                                            <input
                                                type="text"
                                                placeholder="123"
                                                maxLength={3}
                                                value={paymentDetails.cvv}
                                                onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                                                className="block w-full border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:border-green-500 focus:ring focus:ring-green-500"
                                            />
                                        </motion.label>
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
                        </motion.div>
                        {/* Resumo */}
                        <motion.div className="lg:w-1/3 lg:ml-4 mt-4 lg:mt-0 p-4 border rounded-lg"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants} 
                        >
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
                        </motion.div>
                    </div>
                </motion.main>
            </AnimatePresence>
        </>
    );
};

export default CheckoutPage;

