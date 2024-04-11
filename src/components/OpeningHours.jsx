import React, { useState, useEffect } from 'react';


function OpeningHours() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeRemaining, setTimeRemaining] = useState('');
    const [openingHours, setOpeningHours] = useState(null);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        const fetchOpeningHours = async () => {
            try {
                const response = await fetch(`${apiUrl}/hours/hours`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    // Assuming the most recent entry is the first one
                    setOpeningHours(data[0]);
                } else {
                    console.log('No opening hours data found');
                    // Optionally set a default or show a specific message to the user
                }
            } catch (error) {
                console.error('Error fetching opening hours:', error);
            }
        };

        fetchOpeningHours();

        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, [apiUrl]);

    useEffect(() => {
        if (openingHours) {
            const currentDayIndex = (currentTime.getDay() + 6) % 7; // Adjusting for Monday start
            const currentDay = days[currentDayIndex];
            if (openingHours[currentDay]) {
                const { open, close } = openingHours[currentDay];
                const nowTime = currentTime.getHours() * 60 + currentTime.getMinutes();
                const openingTime = parseInt(open.split(':')[0]) * 60 + parseInt(open.split(':')[1]);
                const closingTime = parseInt(close.split(':')[0]) * 60 + parseInt(close.split(':')[1]);

                if (nowTime < openingTime) {
                    setTimeRemaining(openingTime - nowTime > 60 ? 'Closed' : `Opening in ${openingTime - nowTime} minutes`);
                } else if (nowTime >= openingTime && nowTime < closingTime) {
                    setTimeRemaining(closingTime - nowTime > 60 ? 'Open' : `Closing in ${closingTime - nowTime} minutes`);
                } else {
                    setTimeRemaining('Closed');
                }
            }
        }
    }, [currentTime, openingHours]);

    if (!openingHours) {
        return <div>Loading opening hours...</div>;
    }

    // Calculate currentDayIndex outside the map function
    const currentDayIndex = (currentTime.getDay() + 6) % 7;

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#8c4322' }}>Opening Hours</h2>
            <table className="mx-auto">
                <tbody>
                {days.map((day, index) => (
                    <tr className="m-2" key={index}>
                        <td>{day === days[currentDayIndex] ? <strong>{day}</strong> : day}</td>
                        <td>{openingHours[day] ? (day === days[currentDayIndex] ? <strong>{openingHours[day].open}</strong> : openingHours[day].open) : 'Not Available'}</td>
                        <td className="mx-2"> -</td>
                        <td>{openingHours[day] ? (day === days[currentDayIndex] ? <strong>{openingHours[day].close}</strong> : openingHours[day].close) : 'Not Available'}</td>
                        <td>
                            {day === days[currentDayIndex] ?
                                <span className="ml-4"><strong>{timeRemaining}</strong></span> : ''}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default OpeningHours;
