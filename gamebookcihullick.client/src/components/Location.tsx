import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Location, Connection } from '../types';
import AchievementsButton from './buttons/AchievementsButton'
import { getPlayer, savePlayer, visitLocation } from '../services/PlayerService';
import SettingsButton from './buttons/SettingsButton'
import PlayerDebugButton from './buttons/PlayerDebugButton';
import MenuButton from './buttons/MenuButton';


const LocationPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Location | null>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const navigate = useNavigate();
    const [playerLocationID, setPlayerLocationID] = useState<number | null>(null);

    useEffect(() => {
        if (!id) return;

        // Fetch location details
        fetch(`https://localhost:7054/api/locations/${id}`)
            .then((response) => response.json())
            .then((result) => {
                setData({
                    ...result,
                    image: `data:image/png;base64,${result.image}`,
                });

                const player = getPlayer();
                if (player) {
                    // Update player's current location
                    player.locationID = parseInt(id, 10);

                    // Mark the location as visited
                    visitLocation(player, player.locationID); // Add this line

                    savePlayer(player); // Save updated player object
                    setPlayerLocationID(player?.locationID || null);
                }
            })
            .catch((error) => console.error('Error fetching location data:', error));

        // Fetch connections
        fetch(`https://localhost:7054/api/locations/${id}/connections`)
            .then((response) => response.json())
            .then((result) => setConnections(result))
            .catch((error) => console.error('Error fetching connections:', error));
    }, [id, navigate]);


    if (!data) return <div>Loading...</div>;

    return (
        <div
            style={{
                backgroundImage: `url(${data.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'gainsboro',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add a semi-transparent background
                    padding: '20px',
                    borderRadius: '10px', // Optional: rounded corners
                }}
            >
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <p>Current Location ID: {playerLocationID}</p>
                <img src={data.image} alt={data.name} style={{ width: '300px', borderRadius: '10px' }} />

                <h3>Reachable Locations</h3>
                <ul>
                    {connections.map((conn) => (
                        <li key={conn.connectedLocationID}>
                            <button
                                onClick={() => navigate(`/location/${conn.connectedLocationID}`)}
                                style={{
                                    fontSize: '16px',
                                    padding: '10px',
                                    marginTop: '10px',
                                    cursor: 'pointer',
                                }}
                            >
                                {conn.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div style={{ display: 'flex' }}>
                    <AchievementsButton />
                    <SettingsButton />
                    <PlayerDebugButton />
                    <MenuButton />
                </div>
            </div>
        </div>
    );

};

export default LocationPage;