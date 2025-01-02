import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Location, Connection, NPC } from '../types';
import AchievementsButton from './buttons/AchievementsButton'
import { getPlayer, savePlayer, visitLocation } from '../services/PlayerService';
import SettingsButton from './buttons/SettingsButton'
import PlayerDebugButton from './buttons/PlayerDebugButton';
import MenuButton from './buttons/MenuButton';


const LocationPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Location | null>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [npc, setNpc] = useState<NPC | null>(null);
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

        // Fetch npc (if it exists)
        // Fetch npc (if it exists for this location)
        fetch(`https://localhost:7054/api/locations/${id}/npcs`)
            .then((response) => {
                if (!response.ok) throw new Error("No NPC found");
                return response.json();
            })
            .then((data) => setNpc({
                ...data,
                image: `data:image/png;base64,${data.image}`,
            }))
            .catch(() => setNpc(null)); // Set to null if no NPC is found

        fetch(`https://localhost:7054/api/locations/${id}/npcs`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Raw API response in React:", data);
                setNpc(data); // Temporarily set the raw response
            });
    }, [id, navigate]);

    useEffect(() => {
        console.log("Fetching NPC for location:", id);
        console.log("Fetched NPC data:", npc);
    }, [id, npc]);


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
                <p>Current Location ID: {npc?.npcID}</p>
                <img src={data.image} alt={data.name} style={{ width: '300px', borderRadius: '10px' }} />
                

                
                {npc ? (
                    <div style={{ margin: '10px' }}>
                        <h2>NPC</h2>
                        {JSON.stringify(npc, null, 2)}
                        <img
                            src={`data:image/png;base64,${npc.image}`}
                            alt={npc.name}
                            style={{ cursor: 'pointer', width: '100px', height: '100px' }}
                            onClick={() => navigate(`/location/${id}/npc/${npc.npcID}`)}
                        />
                        <p>{npc.name}</p>
                    </div>
                ) : (
                    <p>No NPC available at this location.</p>
                )}


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