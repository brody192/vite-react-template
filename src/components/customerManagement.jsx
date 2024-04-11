import React, { useState, useEffect } from 'react';

function EditCustomerModal({ customer, onSave, onCancel }) {
    const [editedCustomer, setEditedCustomer] = useState(customer);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomer({ ...editedCustomer, [name]: value });
    };

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 w-4/5 max-w-md">
                <h2 className="text-lg font-bold">Edit Customer</h2>
                <div className="mt-4">
                    <label className="block">
                        Username:
                        <input type="text" name="username" value={editedCustomer.username} onChange={handleInputChange}
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </label>
                    <label className="block mt-4">
                        Email:
                        <input type="email" name="email" value={editedCustomer.email} onChange={handleInputChange}
                               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </label>
                    <div className="mt-4">
                        <div>Address:</div>
                        <label className="block mt-2">
                            Street:
                            <input type="text" name="street" value={editedCustomer.address.street}
                                   onChange={handleInputChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </label>
                        <label className="block mt-2">
                            City:
                            <input type="text" name="city" value={editedCustomer.address.city}
                                   onChange={handleInputChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </label>
                        <label className="block mt-2">
                            Postal Code:
                            <input type="text" name="postalCode" value={editedCustomer.address.postalCode}
                                   onChange={handleInputChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </label>
                        <label className="block mt-2">
                            Country:
                            <input type="text" name="country" value={editedCustomer.address.country}
                                   onChange={handleInputChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                        </label>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={() => onSave(editedCustomer)}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save
                    </button>
                    <button onClick={onCancel}
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}


function CustomerManagement() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [customers, setCustomers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch(`${apiUrl}/users/users`);
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };
        fetchCustomers();
    }, []);

    const handleChangeRole = async (customerId) => {
        try {
            // Ask for confirmation before proceeding
            const confirmed = window.confirm("Are you sure you want to change the role?");
            if (!confirmed) {
                return; // If not confirmed, exit the function
            }

            // Find the customer whose role is to be changed
            const customerToUpdate = customers.find(customer => customer._id === customerId);
            if (!customerToUpdate) {
                console.error('Customer not found');
                return;
            }

            // Determine the new role based on the current role
            const newRole = customerToUpdate.role === 'admin' ? 'customer' : 'admin';

            const response = await fetch(`${apiUrl}/users/users/${customerId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({role: newRole}),
            });

            if (!response.ok) {
                throw new Error('Failed to change role');
            }

            // Update the role in the customer list
            const updatedCustomers = customers.map(customer =>
                customer._id === customerId ? {...customer, role: newRole} : customer
            );
            setCustomers(updatedCustomers);
        } catch (error) {
            console.error('Error changing role:', error);
        }
    };

    const handleEdit = (customerId) => {
        const customer = customers.find(c => c._id === customerId);
        if (customer) {
            // Ensure address is an object with all fields even if some are missing or undefined
            const customerWithAddress = {
                ...customer,
                address: {
                    street: customer.address?.street || '',
                    city: customer.address?.city || '',
                    postalCode: customer.address?.postalCode || '',
                    country: customer.address?.country || '',
                },
            };
            setEditingCustomer(customerWithAddress);
            setIsEditModalOpen(true);
        }
    };


    const handleSaveEdit = () => {
        console.log('Save editing for:', editingCustomer);
        // Add logic to save the edited customer details
        setIsEditModalOpen(false);
    };

    const handleDelete = async (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            console.log('Deleting:', customerId);
            try {
                const response = await fetch(`${apiUrl}/users/users/${customerId}`, {
                    method: 'DELETE',
                    headers: {
                        // Include any necessary headers, such as authentication tokens
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                // Update the customers state to filter out the deleted customer
                setCustomers(prevCustomers => prevCustomers.filter(customer => customer._id !== customerId));
            } catch (error) {
                console.error('Error deleting the customer:', error);
            }
        }
    };


    if (customers.length === 0) {
        return <div>Loading customers...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Customer Management</h2>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-2">Customer ID</th>
                    <th className="border border-gray-400 p-2">Name</th>
                    <th className="border border-gray-400 p-2">Email</th>
                    <th className="border border-gray-400 p-2">Total Amount Spend</th>
                    <th className="border border-gray-400 p-2">Accept Marketing</th>
                    <th className="border border-gray-400 p-2">Address</th>
                    <th className="border border-gray-400 p-2">Action</th>
                </tr>
                </thead>
                <tbody>
                {customers.map(customer => (
                    <tr key={customer._id} className="hover:bg-gray-100">
                        <td className="border border-gray-400 p-2">{customer._id}</td>
                        <td className="border border-gray-400 p-2">{customer.username}</td>
                        <td className="border border-gray-400 p-2">{customer.email}</td>
                        <td className="border border-gray-400 p-2">{customer.totalAmountSpent}</td>
                        <td className="border border-gray-400 p-2">
                            {customer.marketingEmailsConsent ? '✅' : '❌'}
                        </td>
                        <td className="border border-gray-400 p-2">
                            {customer.address
                                ? `${customer.address.street || ''}, ${customer.address.city || ''}, ${customer.address.postalCode || ''}, ${customer.address.country || ''}`
                                : 'No address provided'}
                        </td>

                        <td className="border border-gray-400 p-2 text-center">
                            <button
                                onClick={() => handleChangeRole(customer._id)}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mx-1"
                            >
                                Role
                            </button>
                            <button
                                onClick={() => handleEdit(customer._id)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1"
                            >
                                Edit
                            </button>
                            {customer.role !== "admin" && (  // Only show this button if customer's role is not 'admin'
                                <button
                                    onClick={() => handleDelete(customer._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1"
                                >
                                    Delete
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isEditModalOpen && (
                <EditCustomerModal
                    customer={editingCustomer}
                    onSave={handleSaveEdit}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
}

export default CustomerManagement;
