// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import ProductManagement from "../components/ProductManagement.jsx";
import OpeningHoursManagement from "../components/OpeningHoursManagement.jsx";
import OrderManagement from "../components/OrderManagement.jsx";
import CustomerManagement from "../components/customerManagement.jsx";
import NewsAndInformationManagement from "../components/NewsAndInformationManagement.jsx";

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState('products');

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>
            <div className="mt-8 flex justify-center bg-gray-200">
                <button onClick={() => setActiveSection('products')} className={`px-4 py-2 ${activeSection === 'products' ? 'bg-boulangerie-main text-white' : 'bg-gray-200'} rounded`}>Products</button>
                <button onClick={() => setActiveSection('orders')} className={`px-4 py-2 ${activeSection === 'orders' ? 'bg-boulangerie-main text-white' : 'bg-gray-200'} rounded`}>Orders</button>
                <button onClick={() => setActiveSection('customers')} className={`px-4 py-2 ${activeSection === 'customers' ? 'bg-boulangerie-main text-white' : 'bg-gray-200'} rounded`}>Customers</button>
                <button onClick={() => setActiveSection('hours')} className={`px-4 py-2 ${activeSection === 'hours' ? 'bg-boulangerie-main text-white' : 'bg-gray-200'} rounded`}>Opening Hours</button>
                <button onClick={() => setActiveSection('news')} className={`px-4 py-2 ${activeSection === 'news' ? 'bg-boulangerie-main text-white' : 'bg-gray-200'} rounded`}>News</button>
            </div>

            <div className="mt-6">
                {activeSection === 'products' && <ProductManagement/>}
                {activeSection === 'orders' && <OrderManagement/>}
                {activeSection === 'customers' && <CustomerManagement/>}
                {activeSection === 'hours' && <OpeningHoursManagement />}
                {activeSection === 'news' && <NewsAndInformationManagement/>}
            </div>
        </div>
    );
}

export default AdminDashboard;
