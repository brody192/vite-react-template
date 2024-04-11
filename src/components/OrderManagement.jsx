import React, { useState } from 'react';

function OrderManagement() {
    // Hardcoded orders data
    const [selectedOrder, setSelectedOrder] = useState(null);
    const isUnderDevelopment = true;

    const orders = [
        {
            id: 1,
            customerName: 'John Doe',
            products: [
                { name: 'Bread', quantity: 2, price: 5.00 },
                { name: 'Croissant', quantity: 3, price: 3.50 },
                { name: 'Baguette', quantity: 1, price: 7.50 }
            ],
            totalPrice: 29.50,
            vat: 4.43,
            status: 'Pending'
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            products: [
                { name: 'Cupcake', quantity: 6, price: 2.25 },
                { name: 'Muffin', quantity: 4, price: 2.00 }
            ],
            totalPrice: 24.50,
            vat: 3.68,
            status: 'Processing'
        },
        {
            id: 3,
            customerName: 'Alice Johnson',
            products: [
                { name: 'Cheesecake', quantity: 1, price: 15.00 },
                { name: 'Brownie', quantity: 2, price: 4.50 },
                { name: 'Cookies', quantity: 12, price: 1.00 }
            ],
            totalPrice: 35.00,
            vat: 5.25,
            status: 'Delivered'
        },
        {
            id: 4,
            customerName: 'Bob Brown',
            products: [
                { name: 'Pizza', quantity: 1, price: 12.00 },
                { name: 'Salad', quantity: 2, price: 6.50 }
            ],
            totalPrice: 25.00,
            vat: 3.75,
            status: 'Shipped'
        }
    ];


    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleChangeStatus = () => {
        // Here you can implement logic to change the status
        // For demonstration purposes, we'll just console.log the action
        console.log('Status changed');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Order Management</h2>

            <table className="w-full border-collapse border border-gray-400">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-2">Order ID</th>
                    <th className="border border-gray-400 p-2">Customer Name</th>
                    <th className="border border-gray-400 p-2">Order Total</th>
                    <th className="border border-gray-400 p-2">Order Status</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleOrderClick(order)}>
                        <td className="border border-gray-400 p-2">{order.id}</td>
                        <td className="border border-gray-400 p-2">{order.customerName}</td>
                        <td className="border border-gray-400 p-2">{order.total}</td>
                        <td className="border border-gray-400 p-2">{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal */}
            {selectedOrder && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                            <div className="bg-boulangerie-main px-4 py-4">
                                <h3 className="text-lg leading-6 font-medium text-white">Invoice</h3>
                            </div>
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-left sm:mt-0 sm:ml-4">
                                        <p className="text-sm font-medium text-gray-600">Customer: {selectedOrder.customerName}</p>
                                        <p className="text-sm font-medium text-gray-600">Order ID: {selectedOrder.id}</p>
                                        <table className="w-full mt-4">
                                            <thead>
                                            <tr className="bg-gray-200">
                                                <th className="border border-gray-400 p-2">Product</th>
                                                <th className="border border-gray-400 p-2">Quantity</th>
                                                <th className="border border-gray-400 p-2">Price</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {selectedOrder.products.map(product => (
                                                <tr key={product.name} className="hover:bg-gray-100">
                                                    <td className="border border-gray-400 p-2">{product.name}</td>
                                                    <td className="border border-gray-400 p-2">{product.quantity}</td>
                                                    <td className="border border-gray-400 p-2">{product.price}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between">
                                    <p className="text-sm font-medium text-gray-700">Total: {selectedOrder.totalPrice}</p>
                                    <p className="text-sm font-medium text-gray-700">VAT: {selectedOrder.vat}</p>
                                    <p className="text-sm font-medium text-gray-700">Status: {selectedOrder.status}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleChangeStatus} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-boulangerie-main text-base font-medium text-white hover:bg-boulangerie-main-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-boulangerie-main sm:ml-3 sm:w-auto sm:text-sm">
                                    Change Status
                                </button>
                                <button onClick={handleCloseModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );

}

export default OrderManagement;
