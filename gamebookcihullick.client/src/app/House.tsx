import React, { useEffect, useState } from 'react';

interface Location {
    name: string;
    description: string;
    image: string;
}

const House: React.FC = () => {
    const [data, setData] = useState<Location | null>(null);

    useEffect(() => {
        fetch('https://localhost:7054/api/locations/1') // Replace with actual backend endpoint
            .then((response) => response.json())
            .then((result) => {
                setData({
                    ...result,
                    image: `data:image/png;base64,${result.image}`, // Base64 conversion
                });
            })
            .catch((error) => console.error('Error fetching house data:', error));
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <p>{JSON.stringify(data)}</p>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <img src={data.image} alt={data.name} style={{ width: '300px' }} />
        </div>
    );
};

export default House;
