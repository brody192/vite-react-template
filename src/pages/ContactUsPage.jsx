// src/pages/ContactUsPage.jsx
import { useState } from 'react';
import GoogleMap from "../components/GoogleMap.jsx";

function ContactUsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data
        console.log(formData);
        alert('Thank you for your message!');
        setFormData({ name: '', email: '', message: '' }); // Reset form after submission
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg border-2 border-boulangerie-main shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-boulangerie-main focus:border-transparent"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-boulangerie-main focus:border-transparent"
                            required
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-boulangerie-main focus:border-transparent"
                            rows="4"
                            required
                        ></textarea>
                        <div className="text-center">
                            <button type="submit"
                                    className="px-6 py-3 bg-boulangerie-main text-white rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-boulangerie-main focus:ring-opacity-50">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <div>
                    <GoogleMap/>
                </div>
            </div>
            <div className="mt-6 text-center p-6 bg-gray-100 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">You can also reach us at:</h2>
                <p className="text-lg mb-2"><span className="font-semibold">Phone:</span> 0131 629 31 34</p>
                <p className="text-lg mb-2">
                    <span className="font-semibold">Email: </span>
                    <a href="mailto:info@theweeboulangerie.co.uk"
                       className="hover:underline hover:text-boulangerie-main">
                        info@theweeboulangerie.co.uk
                    </a>
                </p>
                <p className="text-lg"><span className="font-semibold">Address:</span> 67 Clerk Street, Edinburgh, EH8
                    9JG</p>
            </div>

        </div>
    );
}

export default ContactUsPage;
