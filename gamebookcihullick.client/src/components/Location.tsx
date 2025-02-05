import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Location } from '../types';
import AchievementsButton from './buttons/AchievementsButton'
import { getPlayer, savePlayer, visitLocation } from '../services/PlayerService';
import SettingsButton from './buttons/SettingsButton'
import PlayerDebugButton from './buttons/PlayerDebugButton';
import MenuButton from './buttons/MenuButton';
import LocationModule from '../components/location.module.css';
import FooterBar from './FooterBar';
import PlayerInventory from './PlayerInventory';

const LocationPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Location | null>(null);
    const navigate = useNavigate();
    const [isInventoryOpen, setInventoryOpen] = useState(false);
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
    }, [id, playerLocationID]);

    if (!data) return <div className={LocationModule.loading}>Loading...</div>;
    return (
        <div className={LocationModule.container} style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${data.image?.pathToFile || 'default'}.webp)` }}>
            <div className={LocationModule.location_propagules}>
                <h2>{data.name}</h2>
                <p>{data.description}</p>

                <div className={LocationModule.list_list_list_list_list_list_list_list_list}>

                    {data.inventories.length > 0 && (
                        <div className={LocationModule.list_list}>
                            {data.inventories && data.inventories.length > 0 ? (
                                data.inventories.map((inventory) => (
                                    <div
                                        key={inventory.inventoryID}
                                        className={LocationModule.object}
                                        onClick={() => navigate(`/location/${inventory.locationID}/inventory/${inventory.inventoryID}`)}
                                    >
                                        <img
                                            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${inventory.image?.pathToFile || 'default'}.webp`}
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
                    )}

                    {data.npCs.length > 0 && (
                        <div className={LocationModule.list_list}>
                            <h3>npCs</h3>
                            {Array.isArray(data.npCs) && data.npCs.length > 0 ? (
                                data.npCs.map((npc) => (
                                    <div key={npc.npcid} className={LocationModule.object}>
                                        <img
                                            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${npc.image?.pathToFile || 'default'}.webp`}
                                            alt={npc.name}
                                            className={LocationModule.img}
                                            onClick={() => navigate(`/location/${id}/npc/${npc.npcid}`)}
                                        />
                                        <p>{npc.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p className={LocationModule.center}>No NPCs available at this location.</p>
                            )}
                        </div>
                    )}

                    {data.connectedLocations.length > 0 && (
                        <div className={LocationModule.list_list}>
                            <h3>Locations</h3>
                            <div className={LocationModule.list}>
                                {data.connectedLocations?.filter((conn) => {
                                    const player = getPlayer();
                                    return !player.blockedLocations.includes(conn.connectedLocationID);
                                }).map((conn) => (
                                    <div key={conn.connectedLocationID} className={LocationModule.object}>
                                        <img
                                            src={conn.imagePath ? `${import.meta.env.VITE_IMAGE_BASE_URL}${conn.imagePath}.webp` : '/default-image.webp'}
                                            onClick={() => navigate(`/location/${conn.connectedLocationID}`)}
                                            className={LocationModule.img}
                                        />
                                        <p>{conn.name}</p>
                                    </div>
                                ))}
                                {id == '7' && (
                                    <div className={LocationModule.object}>
                                        <img
                                            src={`${import.meta.env.VITE_IMAGE_BASE_URL}customer.webp`}
                                            onClick={() => navigate('/customer')}
                                            className={LocationModule.img}
                                        />
                                        <p>Customer</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={LocationModule.btns}>
                <AchievementsButton />
                <SettingsButton />
                <PlayerDebugButton />
                <MenuButton />
            </div>
            {isInventoryOpen && <PlayerInventory onClose={() => setInventoryOpen(false)} />}
            <FooterBar onOpenInventory={() => setInventoryOpen(true)} />
        </div>
    );
};

export default LocationPage;
