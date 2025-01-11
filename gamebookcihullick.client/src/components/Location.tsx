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
    const [npcs, setNpcs] = useState < NPC[]>([]);
    const navigate = useNavigate();
    const [playerLocationID, setPlayerLocationID] = useState<number | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}`)
            .then((response) => response.json())
            .then((result) => {
                setData(result);

                const player = getPlayer();
                if (player) {
                    player.locationID = parseInt(id, 10);

                    visitLocation(player, player.locationID);

                    savePlayer(player);
                    setPlayerLocationID(player?.locationID || null);
                }
            })
            .catch((error) => console.error('Error fetching location data:', error));


        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}/connections`)
            .then((response) => response.json())
            .then((result) => setConnections(result))
            .catch((error) => console.error('Error fetching connections:', error));

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}/npcs`)
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch NPCs");
                return response.json();
            })
            .then((data) => {
                console.log("Fetched NPCs:", data);
                setNpcs(data);
            })
            .catch((error) => {
                console.error("Error fetching NPCs:", error);
                setNpcs([]);
            });

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}/npcs`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Raw API response in React:", data);
                setNpcs(data);
            });
    }, [id, navigate]);

    useEffect(() => {
        console.log("Fetching NPC for location:", id);
        console.log("Fetched NPC data:", npcs);
    }, [id, npcs]);


    if (!data) return <div>Loading...</div>;

    return (
        <div
            style={{
                backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${data.image.pathToFile}.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '120vh',
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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >
                <h2>{data.name}</h2>
                <p>{data.description}</p>
                <p>Current Location ID: {playerLocationID}</p>

                

                
                <h2>NPCs</h2>
                {npcs.length > 0 ? (
                    npcs.map((npc) => (
                        <div key={npc.npcid} style={{ margin: '10px' }}>
                            <img
                                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${npc.image.pathToFile}.webp`}
                                alt={npc.name}
                                style={{ cursor: 'pointer', width: '100px', height: '100px' }}
                                onClick={() => {
                                    console.log("NPC ID:", npc.npcid);
                                    navigate(`/location/${id}/npc/${npc.npcid}`)
                                }}
                            />
                            <p>{npc.name}</p>
                            <p>{npc.npcid}</p>
                        </div>
                    ))
                ) : (
                    <p>No NPCs available at this location.</p>
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