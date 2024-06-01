import React from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import productsData from "../data/products.json";
import Header from '../components/Header';
import { IoArrowBack } from "react-icons/io5";

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = productsData.find((product) => product.id === id);

    if (!product) {
        return <div>Produto não encontrado</div>;
    }

    const handleBackClick = () => {
        navigate(-1);
      };

    return (
        <div>
            <Header
                onPriceFilter={() => { }}
                onClearFilter={() => { }}
                setSearchTerm={() => { }}
                priceRange={null}
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
                            <button className="bg-green-500 text-white px-4 py-2 rounded">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductDetails;
