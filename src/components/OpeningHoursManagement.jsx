import React, { useState, useEffect } from 'react';

function OpeningHoursManagement() {
    const apiUrl = import.meta.env.VITE_API_URL;
    // Initialize tempOpeningHours with initialOpeningHours to ensure all days are present
    const [tempOpeningHours, setTempOpeningHours] = useState({
        Monday: { open: '00:00', close: '00:00' },
        Tuesday: { open: '00:00', close: '00:00' },
        Wednesday: { open: '00:00', close: '00:00' },
        Thursday: { open: '00:00', close: '00:00' },
        Friday: { open: '00:00', close: '00:00' },
        Saturday: { open: '00:00', close: '00:00' },
        Sunday: { open: '00:00', close: '00:00' },
    });
    const [openingHoursId, setOpeningHoursId] = useState(null);

    useEffect(() => {
        const fetchOpeningHours = async () => {
            const response = await fetch(`${apiUrl}/hours/hours`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setOpeningHoursId(data[0]._id);
                    setTempOpeningHours(data[0]);
                }
            } else {
                console.error('Failed to fetch opening hours');
            }
        };

        fetchOpeningHours();
    }, [apiUrl]);

    const handleTimeChange = (day, openOrClose, time) => {
        setTempOpeningHours({
            ...tempOpeningHours,
            [day]: {
                ...tempOpeningHours[day],
                [openOrClose]: time,
            },
        });
    };

    const saveChanges = async () => {
        if (!tempOpeningHours) {
            console.error('Opening hours data is null');
            return;
        }

        const method = openingHoursId ? 'PUT' : 'POST';
        const url = openingHoursId ? `${apiUrl}/hours/hours/${openingHoursId}` : `${apiUrl}/hours/hours`;

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tempOpeningHours),
        });

        if (response.ok) {
            console.log('Opening hours updated successfully');
            if (!openingHoursId) {
                const data = await response.json();
                setOpeningHoursId(data._id);
            }
        } else {
            console.error('Failed to update opening hours');
        }
    };

    if (!tempOpeningHours) return <div>Loading...</div>;

    return (
        <div className="mx-auto max-w-md">
            <table className="w-full">
                <thead>
                <tr>
                    <th className="p-2"></th>
                    <th className="p-2">Open</th>
                    <th className="p-2">Close</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(tempOpeningHours).map((day) => {
                    if (['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(day)) {
                        return (
                            <tr key={day}>
                                <td className="font-bold text-lg p-2 text-center">{day}</td>
                                <td className="p-2">
                                    <input
                                        type="time"
                                        value={tempOpeningHours[day].open}
                                        onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                                        className="w-full border border-gray-300 rounded p-1"
                                    />
                                </td>
                                <td className="p-2">
                                    <input
                                        type="time"
                                        value={tempOpeningHours[day].close}
                                        onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                                        className="w-full border border-gray-300 rounded p-1"
                                    />
                                </td>
                            </tr>
                        );
                    } else {
                        return null; // Exclude non-day fields
                    }
                })}

                </tbody>
            </table>
            <div className="text-center">
                <button
                    className="mt-4 bg-boulangerie-main hover:bg-boulangerie-main-hover text-white px-6 py-3 rounded transition duration-150 ease-in-out"
                    onClick={saveChanges}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default OpeningHoursManagement;
