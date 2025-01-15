import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Location, Connection, NPC, Inventory } from '../types';
import AchievementsButton from './buttons/AchievementsButton'
import { getPlayer, savePlayer, visitLocation } from '../services/PlayerService';
import SettingsButton from './buttons/SettingsButton'
import PlayerDebugButton from './buttons/PlayerDebugButton';
import MenuButton from './buttons/MenuButton';
import LocationModule from '../components/location.module.css';


const LocationPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Location | null>(null);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [npcs, setNpcs] = useState<NPC[]>([]);
    const navigate = useNavigate();
    const [playerLocationID, setPlayerLocationID] = useState<number | null>(null);
    const [inventories, setInventories] = useState<Inventory[]>([]);

    useEffect(() => {
        if (!id) return;

        setInventories([]);

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}`)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                console.log(playerLocationID);
                const player = getPlayer();
                if (player) {
                    player.locationID = parseInt(id, 10);
                    visitLocation(player, player.locationID);
                    savePlayer(player);
                    setPlayerLocationID(player?.locationID || null);
                }
            });

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}/connections`)
            .then((response) => response.json())
            .then((result) => setConnections(result));

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}/npcs`)
            .then((response) => response.json())
            .then((data) => setNpcs(data));

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Locations/${id}/inventories`)
            .then((response) =>  response.json())
            .then((data) => setInventories(data))
            .catch((error) => console.error('Error fetching inventories:', error));
    }, [id, playerLocationID], );


    if (!data) return <div className={LocationModule.loading}>Loading...</div>;

    return (
        <div className={LocationModule.container} style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${data.image.pathToFile}.webp)` }}>
            <div className={LocationModule.loc_title}>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
            </div>

            <div className={LocationModule.location_propagules}>
                <div className={LocationModule.list_list}>
                    <h3>NPCs</h3>
                    {npcs.length > 0 ? (

                        npcs.map((npc) => (
                            <div key={npc.npcid} className={LocationModule.object}>
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${npc.image.pathToFile}.webp`}
                                    alt={npc.name}
                                    className={LocationModule.img}
                                    onClick={() => {
                                        console.log("NPC ID:", npc.npcid);
                                        navigate(`/location/${id}/npc/${npc.npcid}`)
                                    }}
                                />
                                <p>{npc.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className={LocationModule.center}>No NPCs available at this location.</p>
                    )}
                </div>
                <div className={LocationModule.list_list}>
                    <h3>Inventories</h3>
                    {inventories.length > 0 ? (
                        inventories.map((inventory) => (
                            <div
                                key={inventory.inventoryID}
                                className={LocationModule.object}
                                onClick={() => navigate(`/location/${inventory.locationID}/inventory/${inventory.inventoryID}`)}
                            >
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${inventory.image.pathToFile}.webp`}
                                    alt={inventory.name}
                                    className={LocationModule.img}
                                />
                                <p>{inventory.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className={LocationModule.center}>No inventories available at this location.</p>
                    )}
                </div>

                <div className={LocationModule.list_list}>
                    <h3>Locations</h3>
                    <div className={LocationModule.list}>
                        {connections.filter((conn) => {
                            const player = getPlayer();
                            return !player.blockedLocations.includes(conn.connectedLocationID);
                        }).map((conn) => (
                            <div key={conn.connectedLocationID} className={LocationModule.object}>
                                <img
                                    src={
                                        conn.imagePath
                                            ? `${import.meta.env.VITE_IMAGE_BASE_URL}${conn.imagePath}.webp`
                                            : '/default-image.webp'
                                    }
                                    onClick={() => navigate(`/location/${conn.connectedLocationID}`)}
                                    className={LocationModule.img}
                                >
                                </img>
                                <p>{conn.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={LocationModule.btns}>
                <AchievementsButton />
                <SettingsButton />
                <PlayerDebugButton />
                <MenuButton />
            </div>
        </div>
    );
};
export default LocationPage;