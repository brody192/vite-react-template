import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FeaturedProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();

    const goToProductsPage = () => {
        navigate('/products'); // Navigate to the products page
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/products/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const allProducts = await response.json();

                // Calculate indexes based on the day of the year
                const today = new Date();
                const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

                // Adjust the logic to select three unique products
                let selectedProducts = [];
                for (let i = 0; i < 3; i++) {
                    const productIndex = (dayOfYear + i) % allProducts.length;
                    selectedProducts.push(allProducts[productIndex]);
                }

                setProducts(selectedProducts);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [apiUrl]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-4" style={{color: '#8c4322'}}>Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-lg"/>
                        <h3 className="text-xl font-bold mt-2" style={{color: '#8c4322'}}>{product.name}</h3>
                        <p className="text-md mt-1">{product.description}</p>
                    </div>
                ))}
            </div>
            <div className="flex justify-center w-full"> {/* Centering the button horizontally */}
                <button onClick={goToProductsPage}
                        className="mt-4 bg-boulangerie-main text-white py-2 px-4 rounded hover:bg-boulangerie-dark">View
                    All Products
                </button>
            </div>
        </section>

    );
}

export default FeaturedProducts;
