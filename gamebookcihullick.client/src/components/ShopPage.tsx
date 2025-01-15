import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import { getPlayer, savePlayer, buyItem } from '../services/PlayerService';
import BackButton from './buttons/BackButton';

const ShopPage: React.FC = () => {
    const [shopItems, setShopItems] = useState<(Item & { quantity: number })[]>([]);
    const player = getPlayer();

    useEffect(() => {
        const fetchShopItems = async () => {
            const shopInventory = player.shopInventory || [];
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch items: ${response.statusText}`);
                }
                const allItems: Item[] = await response.json();

                const itemsToDisplay = shopInventory.map((inventoryItem: { itemID: number; quantity: number }) => {
                    const fullItem = allItems.find((item) => item.itemID === inventoryItem.itemID);
                    if (!fullItem) {
                        console.warn(`Item with ID ${inventoryItem.itemID} not found.`);
                        return null;
                    }
                    return {
                        ...fullItem,
                        quantity: inventoryItem.quantity,
                    };
                }).filter((item) => item !== null) as (Item & { quantity: number })[];

                setShopItems(itemsToDisplay);
            } catch (error) {
                console.error('Error fetching shop items:', error);
            }
        };

        fetchShopItems();
    }, [player.shopInventory]);

    const handleBuyItem = (itemID: number, itemCost: number) => {
        const success = buyItem(player, itemID, 1, itemCost);
        if (success) {
            savePlayer(player);
        } else {
            alert('Not enough money!');
        }
    };

    return (
        <div>
            <h1>Shop Inventory</h1>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', } }>
                {shopItems.map((item) => (
                    <div key={item.itemID} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
                        <img
                            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image.pathToFile}.webp`}
                            alt={item.name}
                            style={{ width: '100px', height: '100px' }}
                        />
                        <h2>{item.name}</h2>
                        <p>Cost: {item.cost} F</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Description: {item.description}</p>
                        <button onClick={() => handleBuyItem(item.itemID, parseInt(item.cost))}>
                            Buy Item
                        </button>
                    </div>
                ))}
            </div>
            <BackButton />
        </div>
    );
};

export default ShopPage;
