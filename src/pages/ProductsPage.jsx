import { useState, useEffect } from 'react';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); // To store the clicked product's details
    const [isModalOpen, setIsModalOpen] = useState(false); // To control the visibility of the modal
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/products/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center">Our Products</h1>
            <p className="mt-4 text-lg text-center">Explore our range of breads, pastries, and more.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow p-6 cursor-pointer" onClick={() => handleProductClick(product)}>
                        {product.available ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
                        ) : (
                            <div className="relative w-full h-64">
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                <div className="absolute inset-0 flex items-center justify-center text-white text-2xl bg-black bg-opacity-50">
                                    Not Available
                                </div>
                            </div>
                        )}
                        <h3 className="text-xl font-bold mt-2">{product.name}</h3>
                        <p className="text-md mt-1">{product.description}</p>
                        <p className="text-lg font-semibold mt-2">£ {product.price}</p>
                    </div>
                ))}
            </div>

            {/* Modal for displaying product details */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                        <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                        <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg mt-4" />
                        <p className="mt-2">{selectedProduct.description}</p>
                        <p className="mt-2 text-lg font-semibold">£ {selectedProduct.price}</p>
                        <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded" onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductsPage;
