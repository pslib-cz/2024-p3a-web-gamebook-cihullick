import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPlayerLocation, getPlayerLocation } from '../services/PlayerService';

interface Location {
    name: string;
    description: string;
    image: string;
}

interface Connection {
    connectedLocationID: number;
    name: string;
    description: string;
}

const Street: React.FC = () => {
    const [data, setData] = useState<Location | null>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://localhost:7054/api/locations/2')
            .then((response) => response.json())
            .then((result) => {
                setData({
                    ...result,
                    image: `data:image/png;base64,${result.image}`,
                });
                // Dynamically set player's location
                setPlayerLocation(result.locationID);
            })
            .catch((error) => console.error('Error fetching street data:', error));

        // Fetch reachable connections
        fetch('https://localhost:7054/api/locations/2/connections')
            .then((response) => response.json())
            .then((result) => setConnections(result))
            .catch((error) => console.error('Error fetching connections:', error));
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div style={{ backgroundImage: `url(${data.image})` }}>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p>Current Location ID: {getPlayerLocation()}</p> {/* Display dynamically set LocationID */}
            <img src={data.image} alt={data.name} style={{ width: '300px' }} />

            {/* Reachable Locations */}
            <h3>Reachable Locations</h3>
            <ul>
                {connections.map((conn) => (
                    <li key={conn.connectedLocationID}>
                        <strong>{conn.name}</strong>
                        <p>{conn.description}</p>
                    </li>
                ))}
            </ul>

            {/* Button to navigate back to House */}
            <button onClick={() => navigate('/house')} style={{ fontSize: '16px', padding: '10px', marginTop: '20px' }}>
                Go to House
            </button>
        </div>
    );
};

export default Street;
