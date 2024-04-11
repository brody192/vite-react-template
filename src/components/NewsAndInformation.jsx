import React, { useState, useEffect } from 'react';

function NewsAndInformation() {
    const apiUrl = import.meta.env.VITE_API_URL;
    // State to hold news data
    const [news, setNews] = useState([]);

    // Fetch news data when component mounts
    useEffect(() => {
        // Function to fetch news data
        const fetchNews = async () => {
            try {
                // Fetch data from your API endpoint
                const response = await fetch(`${apiUrl}/news/news`);
                if (!response.ok) {
                    throw new Error('Failed to fetch news data');
                }
                // Parse the JSON response
                const data = await response.json();
                // Update the news state with fetched data
                setNews(data);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        // Call the fetchNews function
        fetchNews();
    }, []); // Empty dependency array ensures this effect runs only once when component mounts

    // Filter news items based on their isDisplayed property
    const displayedNews = news.filter(item => item.isDisplayed);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">News and Information</h2>
            {displayedNews.map(item => (
                <div key={item._id} className="bg-white rounded shadow-md p-4 mb-4">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p>{item.content}</p>
                </div>
            ))}
        </div>
    );
}

export default NewsAndInformation;
