import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function UpdateProfilePage() {
    const { user, updateUser, updatePassword } = useAuth();
    const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        address: {
            street: '',
            city: '',
            postalCode: '',
            country: '',
        },
        marketingEmailsConsent: false,
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                address: user.address || {
                    street: '',
                    city: '',
                    postalCode: '',
                    country: '',
                },
                marketingEmailsConsent: user.marketingEmailsConsent || false,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (Object.keys(formData.address).includes(name)) {
            setFormData(prevState => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [name]: value,
                },
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (showPasswordUpdate) {
            if (passwordData.newPassword === passwordData.confirmPassword) {
                updatePassword(passwordData);
            } else {
                console.error('Passwords do not match');
            }
        } else {
            updateUser(formData);
        }
    };

    const togglePasswordUpdate = () => setShowPasswordUpdate(!showPasswordUpdate);

    return (
        <div className="m-10 update-profile p-4 max-w-2xl mx-auto shadow-lg rounded bg-white">
            <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>
            {user && (
            <form onSubmit={handleSubmit} className="space-y-4">
                {!showPasswordUpdate && (
                    <>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                        {/* Address fields */}
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="street"
                            value={formData.address.street}
                            onChange={handleChange}
                            placeholder="Street"
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="city"
                            value={formData.address.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="postalCode"
                            value={formData.address.postalCode}
                            onChange={handleChange}
                            placeholder="Postal Code"
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="text"
                            name="country"
                            value={formData.address.country}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                        />
                        {/* Marketing consent */}
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="marketingEmailsConsent"
                                checked={formData.marketingEmailsConsent}
                                onChange={(e) => setFormData({ ...formData, marketingEmailsConsent: e.target.checked })}
                            />
                            <span>I agree to receive marketing communications.</span>
                        </label>
                        <button
                            type="button"
                            onClick={togglePasswordUpdate}
                            className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors duration-300">
                            Change Password
                        </button>
                    </>
                )}

                {showPasswordUpdate && (
                    <div className="space-y-4 mt-4">
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="Current Password"
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="New Password"
                            required
                        />
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm New Password"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordUpdate}
                            className="bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300 transition-colors duration-300">
                            Cancel Password Change
                        </button>
                    </div>
                )}

                <button
                    className="w-full bg-boulangerie-main text-white p-2 rounded hover:bg-boulangerie-dark transition-colors duration-300 mt-4"
                    type="submit">
                    {showPasswordUpdate ? 'Update Password' : 'Update Profile'}
                </button>
            </form>
            )}
        </div>
    );
}

export default UpdateProfilePage;
