import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const House: React.FC = () => {
    const [data, setData] = useState<Location | null>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch house location details
        fetch('https://localhost:7054/api/locations/1')
            .then((response) => response.json())
            .then((result) => {
                setData({
                    ...result,
                    image: `data:image/png;base64,${result.image}`, // Base64 conversion
                });
            })
            .catch((error) => console.error('Error fetching house data:', error));

        // Fetch reachable connections
        fetch('https://localhost:7054/api/locations/1/connections')
            .then((response) => response.json())
            .then((result) => setConnections(result))
            .catch((error) => console.error('Error fetching connections:', error));
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
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

            {/* Button to navigate to Street */}
            <button onClick={() => navigate('/street')} style={{ fontSize: '16px', padding: '10px', marginTop: '20px' }}>
                Go to Street
            </button>
        </div>
    );
};

export default House;
