import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Location } from '../types';
import AchievementsButton from './buttons/AchievementsButton';
import { addItemToInventory, getPlayer, removeItemFromInventory, savePlayer, visitLocation } from '../services/PlayerService';
import SettingsButton from './buttons/SettingsButton';
import MenuButton from './buttons/MenuButton';
import LocationModule from '../components/location.module.css';
import FooterBar from './FooterBar';
import ShopFooterBar from './ShopFooterBar';
import PlayerInventory from './PlayerInventory';
import ShopInventoryPage from './ShopInventoryPage';

const LocationPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Location | null>(null);
    const navigate = useNavigate();
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const [playerLocationID, setPlayerLocationID] = useState<number | null>(null);
    const player = getPlayer();
    const [washComplete, setWashComplete] = useState(false);
    const hasWashingmachine = player.inventory.some(item => item.name === 'Washing machine');

    useEffect(() => {
        if (!id) return;

        const fetchLocation = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}`);
            const result = await response.json();
            setData(result);

            const player = getPlayer();
            if (player) {
                player.locationID = parseInt(id);
                visitLocation(player, player.locationID);
                setPlayerLocationID(player?.locationID || null);
                savePlayer(player);
            }
        };

        fetchLocation();
    }, [id, playerLocationID]);

    const handleWashClothes = () => {
        if (!player.inventory.some(item => item.name === 'Clean clothes')) {
            removeItemFromInventory(player, 16, 1);
            addItemToInventory(player, 18, 1, "Clean clothes", 0);
        }
        setWashComplete(true);
        savePlayer(player);
    };

    if (!data) return <div className={LocationModule.loading}>Loading...</div>;
    return (
        <div className={LocationModule.container} style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${data.image?.pathToFile || 'default'}.webp)` }}>
            <div className={LocationModule.location_propagules}>
                <h2>{data.name}</h2>
                <p>{data.description}</p>

                <div className={LocationModule.list_list_list_list_list_list_list_list_list}>

                    {data.inventories && (
                        <div className={LocationModule.list_list}>
                            {id == '7' && (
                                <h3>Manage store</h3>
                            )}
                            {id == '6' && (
                                <h3>Visit the store</h3>
                            )}
                            <div className={LocationModule.list}>
                                {data.inventories && (
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
                                )}
                            </div>
                        </div>
                    )}

                    {data.npCs?.length > 0 && (
                        <div className={LocationModule.list_list}>
                            <h3>NPCs</h3>
                            <div className={LocationModule.list}>
                                {data.npCs && (
                                    data.npCs.map((npc) => (
                                        <div key={npc.npcid} className={LocationModule.object}>
                                            <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${npc.image?.pathToFile}.webp`}
                                                 alt={npc.name}
                                                 className={LocationModule.img}
                                                 onClick={() => navigate(`/location/${id}/npc/${npc.npcid}`)}/>
                                            <p>{npc.name}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {data.connectedLocations && (
                        <div className={LocationModule.list_list}>
                            <h3>Locations</h3>
                            <div className={LocationModule.list}>
                                {data.connectedLocations?.filter(conn => !player.blockedLocations.includes(conn.connectedLocationID)).map((conn) => (
                                    <div key={conn.connectedLocationID} className={LocationModule.object}>
                                        <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${conn.imagePath}.webp`}
                                             onClick={() => navigate(`/location/${conn.connectedLocationID}`)}
                                             className={LocationModule.img}/>
                                        <p>{conn.name}</p>
                                    </div>
                                ))}
                                {id == '7' && (
                                    <div className={LocationModule.object}>
                                        <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}customer.webp`}
                                             onClick={() => navigate('/customer')}
                                             className={LocationModule.img}/>
                                        <p>Customer</p>
                                    </div>
                                )}
                                {id == '11' && (
                                    <div className={LocationModule.object}>
                                        <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}therecure.webp`}
                                             onClick={() => navigate('/gambba')}
                                             className={LocationModule.img}/>
                                        <p>Gamble</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {data.locationID === 13 && hasWashingmachine && (
                        <div className={LocationModule.object}>
                            <h3>Washing machine</h3>
                            {washComplete ? (
                                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/washingmachine.webp`}
                                     alt="Fixed Washing Machine"
                                     className={LocationModule.img_noclick}
                                     onClick={handleWashClothes}/>
                            ) : (
                                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/washingmachine.webp`}
                                     alt="Fixed Washing Machine"
                                     className={LocationModule.img}
                                     onClick={handleWashClothes}/>
                            )}

                            {!washComplete ? <p>(click to use)</p> : <p>Your clothes are now sparkling clean!</p>}
                        </div>
                    )}

                    {data.locationID === 13 && !hasWashingmachine && (
                        <div className={LocationModule.object}>
                            <h3>Broken washing machine</h3>
                            <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/washingmachine.webp`}
                                 alt="Broken Washing Machine"
                                 style={{ filter: 'grayscale(100%)' }}
                                 className={LocationModule.img_noclick}/>
                        </div>
                    )}

                    {id == '10' && (
                        <div className={LocationModule.object}>
                            <button onClick={() => navigate('/cutscene/5')} className={LocationModule.end_btn}>End Game</button>
                        </div>
                    )}
                </div>
            </div>

            <div className={LocationModule.btns}>
                <AchievementsButton />
                <SettingsButton />
                <MenuButton />
            </div>

            {isInventoryOpen && (
                data.locationID === 7 ? (
                    <ShopInventoryPage onClose={() => setInventoryOpen(false)} />
                ) : (
                    <PlayerInventory onClose={() => setInventoryOpen(false)} />
                )
            )}

            {data.locationID === 7 ? (
                <ShopFooterBar onOpenInventory={() => setInventoryOpen(true)} />
            ) : (
                <FooterBar onOpenInventory={() => setInventoryOpen(true)} />
            )}
        </div>
    );
};

export default LocationPage;