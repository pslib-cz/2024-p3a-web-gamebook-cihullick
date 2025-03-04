import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import { getPlayer, savePlayer, buyItem } from '../services/PlayerService';
import ShopPageModule from '../components/shoppage.module.css';
import FooterBar from './FooterBar';
import PlayerInventory from './PlayerInventory';

const ShopPage: React.FC = () => {
    const [shopItems, setShopItems] = useState<(Item & { quantity: number })[]>([]);
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const player = getPlayer();

    useEffect(() => {
        const fetchShopItems = () => {
            const shopInventory = player.shopInventory || [];

            fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch items: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((allItems: Item[]) => {
                    const itemsToDisplay = shopInventory.map((inventoryItem) => {
                        const fullItem = allItems.find(item => item.itemID === inventoryItem.itemID);
                        if (!fullItem) {
                            console.warn(`Item with ID ${inventoryItem.itemID} not found.`);
                            return null;
                        }
                        return {
                            ...fullItem,
                            quantity: inventoryItem.quantity,
                        };
                    }).filter(item => item !== null);

                    setShopItems(itemsToDisplay);
                })
                .catch(error => {
                    console.error('Error fetching shop items:', error);
                });
        };
        fetchShopItems();
    }, [player.shopInventory]);


    const handleBuyItem = (itemID: number, name: string, itemCost: number) => {
        const success = buyItem(player, itemID, 1, name, itemCost);
        if (success) {
            savePlayer(player);
        } else {
            alert('Not enough money!');
        }
    };

    return (
        <div className={ShopPageModule.thecontainerwithin}>
            <div className={ShopPageModule.inv_title_propagules}>
                <h1>Buy Items</h1>
            </div>

            <div className={ShopPageModule.list_margin}>
                <div className={ShopPageModule.item_list}>
                    {shopItems
                        .sort((a, b) => a.type.toLowerCase().localeCompare(b.type.toLowerCase()))
                        .map((item) => (
                            <div key={item.itemID} className={ShopPageModule.item}>
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image.pathToFile}.webp`}
                                    alt={item.name}
                                    className={ShopPageModule.img}
                                />
                                <div className={ShopPageModule.item_info}>
                                    <h2>{item.name}</h2>
                                    <p>{item.quantity} in stock</p>
                                    <p>{item.cost} F per unit</p>
                                </div>
                                <button className={ShopPageModule.buy_btn} onClick={() => handleBuyItem(item.itemID, item.name, parseInt(item.cost))}>
                                    Buy Item
                                </button>
                            </div>
                        ))}
                </div>
            </div>

            {isInventoryOpen && <PlayerInventory onClose={() => setInventoryOpen(false)} />}
            <FooterBar onOpenInventory={() => setInventoryOpen(true)} />
        </div>
    );
};

export default ShopPage;
