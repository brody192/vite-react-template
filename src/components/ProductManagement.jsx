import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

function ProductManagement() {
    const [products, setProducts] = useState([]); // Store fetched products
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");
    const [available, setAvailable] = useState(true);
    const [editingProductId, setEditingProductId] = useState(null); // Track the ID of the product being edited
    const [error, setError] = useState(null);

    // Replace 'YOUR_API_URL' with the actual URL of your backend API
    const apiUrl = import.meta.env.VITE_API_URL || 'YOUR_API_URL';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/products/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data); // Set the products state with the fetched data
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, [apiUrl]);

    const handleEdit = (id) => {
        const productToEdit = products.find(product => product._id === id);
        if (productToEdit) {
            setName(productToEdit.name);
            setDescription(productToEdit.description);
            setPrice(productToEdit.price);
            setImageUrl(productToEdit.imageUrl);
            setCategory(productToEdit.category || "");
            setAvailable(productToEdit.available !== undefined ? productToEdit.available : true);
            setEditingProductId(id);
            setShowModal(true);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await fetch(`${apiUrl}/products/products/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Update the local state only if the server-side deletion is successful
                    setProducts(products.filter(product => product.id !== id));
                } else {
                    // Handle error if deletion wasn't successful
                    alert('Failed to delete the product. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting the product:', error);
                setError('Error deleting the product');
            }
        }
    };

    const handleAdd = () => {
        setName("");
        setDescription("");
        setPrice("");
        setImageUrl("");
        setCategory("");
        setAvailable(true);
        setEditingProductId(null); // Reset editing product ID
        setShowModal(true); // Open the modal
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name || !price || isNaN(price)) {
                setError("Please fill out all required fields and ensure price is a valid number.");
                return;
            }

            const endpoint = editingProductId ? `${apiUrl}/products/products/${editingProductId}` : `${apiUrl}/products/products`;
            const method = editingProductId ? 'PUT' : 'POST';

            const productData = { name, description, price, imageUrl, category, available };

            const response = await fetch(endpoint, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                setShowModal(false);
                setName("");
                setDescription("");
                setPrice("");
                setImageUrl("");
                setCategory("");
                setAvailable(true);
                setEditingProductId(null);
                setError(null);

                // Fetch updated products list or manually update the state
                if (editingProductId) {
                    setProducts(products.map(p => p.id === editingProductId ? { ...p, ...productData } : p));
                } else {
                    const newProduct = await response.json();
                    setProducts([...products, newProduct]);
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to add/update product');
            }
        } catch (error) {
            console.error('Error adding/updating product:', error);
            setError('Error adding/updating product');
        }
    };

    const handleFileUpload = async (file) => {
        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const blob = new Blob([event.target.result], { type: file.type });
                const formData = new FormData();
                formData.append('image', blob, file.name);
                const response = await fetch(`${apiUrl}/upload/upload`, {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.url);
                } else {
                    console.error('Failed to upload image');
                }
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // Function to toggle the availability of a product
    const toggleAvailability = async (id, currentAvailable) => {
        try {
            const response = await fetch(`${apiUrl}/products/products/${id}/availability`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ available: !currentAvailable })
            });

            if (!response.ok) {
                throw new Error('Failed to update availability');
            }

            // Assuming the response contains the updated product
            const updatedProduct = await response.json();

            // Update the local state with the updated product
            setProducts(products.map(product => {
                if (product._id === updatedProduct._id) {
                    return updatedProduct;
                }
                return product;
            }));
        } catch (error) {
            console.error('Error toggling availability:', error);
        }
    };
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Manage Products</h2>
            <button
                onClick={handleAdd}
                className="mb-4 px-4 py-2 bg-boulangerie-main text-white rounded hover:bg-boulangerie-main-hover">
                Add New Product
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow p-6 cursor-pointer">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-lg"/>
                        <h3 className="text-xl font-bold mt-2">
                            {product.name}
                            <span onClick={() => toggleAvailability(product._id, product.available)}
                                  className="ml-2 cursor-pointer">
                    {product.available ? <FontAwesomeIcon icon={faCheck} className="text-brown-500"/> :
                        <FontAwesomeIcon icon={faTimes} className="text-red-500"/>}
                </span>
                        </h3>
                        <p className="text-md mt-1">{product.description}</p>
                        <p className="text-lg font-semibold mt-2">£ {product.price}</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={() => handleEdit(product._id)}
                                    className="px-4 py-2 bg-boulangerie-main text-white rounded hover:bg-boulangerie-main-hover">Edit
                            </button>
                            <button onClick={() => handleDelete(product._id)}
                                    className="px-4 py-2 bg-boulangerie-main text-white rounded hover:bg-boulangerie-main-hover">Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>


            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="modal-container">
                        <h2 className="text-2xl font-bold mb-4">{editingProductId ? "Edit Product" : "Add New Product"}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-bold mb-2">Name:</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                                       className="w-full border rounded py-2 px-3" required/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description"
                                       className="block text-sm font-bold mb-2">Description:</label>
                                <textarea id="description" value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                          className="w-full border rounded py-2 px-3"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-bold mb-2">Price:</label>
                                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)}
                                       className="w-full border rounded py-2 px-3" required/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="image" className="block text-sm font-bold mb-2">Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            handleFileUpload(file); // Call the handleFileUpload function with the selected file
                                        }
                                    }}
                                    className="w-full border rounded py-2 px-3"
                                />
                            </div>


                            <div className="mb-4">
                                <label htmlFor="category" className="block text-sm font-bold mb-2">Category:</label>
                                <input type="text" id="category" value={category}
                                       onChange={(e) => setCategory(e.target.value)}
                                       className="w-full border rounded py-2 px-3"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="available" className="block text-sm font-bold mb-2">Available:</label>
                                <input type="checkbox" id="available" checked={available}
                                       onChange={(e) => setAvailable(e.target.checked)} className="mr-2"/>
                                <span>Available</span>
                            </div>
                            <div className="flex justify-between">
                                <button type="submit"
                                        className="px-4 py-2 bg-boulangerie-main text-white rounded hover:bg-boulangerie-main-hover">{editingProductId ? "Update" : "Add"}
                                    Product
                                </button>
                                <button type="button" onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded ml-2 hover:bg-gray-600">Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductManagement;
