import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import { getPlayer, savePlayer, removeItemFromInventory, addItemToInventory } from '../services/PlayerService';
import ShopPageModule from '../components/shoppage.module.css';
import ShopInventoryPage from './ShopInventoryPage';
import ShopFooterBar from './ShopFooterBar';

const ShopPage: React.FC = () => {
    const [shopItems, setShopItems] = useState<(Item & { quantity: number })[]>([]);
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const player = getPlayer();

    useEffect(() => {
        const fetchShopItems = () => {
            const shopWarehouse = player.shopWarehouse || [];

            fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch items: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((allItems: Item[]) => {
                    const itemsToDisplay = shopWarehouse.map((inventoryItem) => {
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
    }, [player.shopWarehouse]);


    const handleMoveItem = (itemID: number, name: string, itemCost: number) => {
        removeItemFromInventory(player, itemID, 1, "warehouse");
        addItemToInventory(player, itemID, 1, name, itemCost, "shop");
        savePlayer(player);
    };

    return (
        <div className={ShopPageModule.thecontainerwithin}>
            <div className={ShopPageModule.inv_title_propagules}>
                <h1>Shop Warehouse</h1>
            </div>

            <div className={ShopPageModule.item_list}>
                {shopItems.map((item) => (
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
                        <button className={ShopPageModule.buy_btn} onClick={() => handleMoveItem(item.itemID, item.name, parseInt(item.cost))}>
                            Move To Shop
                        </button>
                    </div>
                ))}
            </div>

            {isInventoryOpen && <ShopInventoryPage onClose={() => setInventoryOpen(false)} />}
            <ShopFooterBar onOpenInventory={() => setInventoryOpen(true)} />
        </div>
    );
};

export default ShopPage;
