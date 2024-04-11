import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function NewsAndInformationManagement() {
    const apiUrl = import.meta.env.VITE_API_URL;
    // State to manage news items
    const [newsItems, setNewsItems] = useState([]);
    // State to manage the form for editing news items
    const [editFormData, setEditFormData] = useState({ id: '', title: '', content: '' });
    // State to manage the form for creating new news
    const [newFormData, setNewFormData] = useState({ title: '', content: '' });

    // Function to fetch news data from the API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${apiUrl}/news/news`);
                if (!response.ok) {
                    throw new Error('Failed to fetch news data');
                }
                const data = await response.json();
                setNewsItems(data);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNews();
    }, []);

    // Function to toggle the isDisplayed property of a news item
    const toggleIsDisplayed = async (id, currentIsDisplayed) => {
        try {
            const response = await fetch(`${apiUrl}/news/news/${id}/isdisplayed`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isDisplayed: !currentIsDisplayed })
            });

            if (!response.ok) {
                throw new Error('Failed to update isDisplayed');
            }

            // Assuming the response contains the updated news item
            const updatedNewsItem = await response.json();

            // Update the local state with the updated news item
            setNewsItems(newsItems.map(news => {
                if (news._id === updatedNewsItem._id) {
                    return updatedNewsItem;
                }
                return news;
            }));
        } catch (error) {
            console.error('Error toggling isDisplayed:', error);
        }
    };

    // Function to handle news item deletion
    const deleteNewsItem = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/news/news/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete news item');
            }

            // Remove the deleted news item from the local state
            setNewsItems(newsItems.filter(news => news._id !== id));
        } catch (error) {
            console.error('Error deleting news item:', error);
        }
    };

    // Function to handle form input changes for creating new news
    const handleNewFormChange = (e) => {
        setNewFormData({
            ...newFormData,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle submission of the form for creating new news
    const handleNewFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/news/news`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: newFormData.title,
                    content: newFormData.content,
                    isDisplayed: true // Set isDisplayed to true for newly created news
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create news item');
            }

            // Add the newly created news item to the local state
            const createdNewsItem = await response.json();
            setNewsItems([...newsItems, createdNewsItem]);

            // Clear the form data
            setNewFormData({ title: '', content: '' });
        } catch (error) {
            console.error('Error creating news item:', error);
        }
    };

    // Function to set the edit form data when editing a news item
    const setEditForm = (newsItem) => {
        setEditFormData({
            id: newsItem._id,
            title: newsItem.title,
            content: newsItem.content
        });
    };

    // Function to handle form input changes for editing news items
    const handleEditFormChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    // Function to handle submission of the form for editing news items
    const handleEditFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/news/news/${editFormData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: editFormData.title,
                    content: editFormData.content
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update news item');
            }

            // Update the local state with the updated news item
            const updatedNewsItem = await response.json();
            setNewsItems(newsItems.map(news => {
                if (news._id === updatedNewsItem._id) {
                    return updatedNewsItem;
                }
                return news;
            }));
            // Clear the edit form data
            setEditFormData({ id: '', title: '', content: '' });
        } catch (error) {
            console.error('Error updating news item:', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">News and Information Management</h2>
            {/* New News Form */}
            <div className="mb-4">
                <form onSubmit={handleNewFormSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={newFormData.title}
                        onChange={handleNewFormChange}
                        placeholder="Enter title"
                        className="mr-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-boulangerie-main"
                        required
                    />
                    <input
                        type="text"
                        name="content"
                        value={newFormData.content}
                        onChange={handleNewFormChange}
                        placeholder="Enter content"
                        className="mr-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-boulangerie-main"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-boulangerie-main text-white px-4 py-2 rounded hover:bg-boulangerie-main-hover transition"
                    >
                        Add News
                    </button>
                </form>
            </div>
            <div>
                {newsItems.map(news => (
                    <div key={news._id} className="bg-white rounded-lg shadow p-6 mb-4">
                        <h3 className="text-xl font-bold">
                            {news.title}
                            <span className="ml-4" onClick={() => toggleIsDisplayed(news._id, news.isDisplayed)}>
                                {news.isDisplayed ? (
                                    <FontAwesomeIcon icon={faEye} />
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                )}
                            </span>
                        </h3>
                        <p className="mt-2">{news.content}</p>
                        <div className="mt-4">
                            <button
                                onClick={() => setEditForm(news)}
                                className="bg-boulangerie-main text-white px-4 py-2 rounded hover:bg-boulangerie-main-hover transition"
                            >
                                <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button
                                onClick={() => deleteNewsItem(news._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition"
                            >
                                <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Edit Form */}
            {editFormData.id && (
                <div className="bg-white rounded-lg shadow p-6 mb-4">
                    <h3 className="text-xl font-bold mb-2">Edit News</h3>
                    <form onSubmit={handleEditFormSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={editFormData.title}
                            onChange={handleEditFormChange}
                            className="mr-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-boulangerie-main"
                            required
                        />
                        <textarea
                            name="content"
                            value={editFormData.content}
                            onChange={handleEditFormChange}
                            className="mr-2 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-boulangerie-main"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-boulangerie-main text-white px-4 py-2 rounded hover:bg-boulangerie-main-hover transition"
                        >
                            Save
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default NewsAndInformationManagement;
