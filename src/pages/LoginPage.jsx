// src/pages/LoginRegisterPage.jsx
import { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";  // Assuming AuthContext.jsx is the correct path


function LoginRegisterPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        marketingConsent: false,
    });

    // Get the login, register, and logout methods from the AuthContext
    const { login, register } = useAuth();  // Ensure you have a register method in your context

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                await login(formData.email, formData.password);
                navigate('/');
            } catch (error) {
                console.error('Login failed:', error);
            }
        } else {
            try {
                await register(formData);
                navigate('/');
            } catch (error) {
                console.error('Registration failed:', error);
            }
        }
    };

    return (
        <div className="p-8">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full p-2 border border-gray-300 rounded"
                            required={!isLogin}
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    {!isLogin && (
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="marketingConsent"
                                checked={formData.marketingConsent}
                                onChange={handleChange}
                                className="form-checkbox h-5 w-5"
                            />
                            <span>I agree to receive marketing communications.</span>
                        </label>
                    )}
                    <button type="submit"
                            className="w-full px-4 py-2 bg-boulangerie-main text-white rounded hover:bg-opacity-90">
                        {isLogin ? 'Log In' : 'Register'}
                    </button>
                </form>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-4 text-sm text-boulangerie-main hover:underline">
                    {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
}

export default LoginRegisterPage;
