import React, { useEffect, useState, useRef } from 'react';
import { getPlayer } from '../services/PlayerService'; // Retrieves player data (localStorage)
import { Item } from '../types/ItemType';
import InventoryModule from '../components/playerinventory.module.css';
import { ShopInventoryItem } from '../types';

interface ShopInventoryProps {
    onClose: () => void;
}

const ShopInventory: React.FC<ShopInventoryProps> = ({ onClose }) => {
    const [shopItems, setShopItems] = useState<(Item & { quantity: number })[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchShopItems = async () => {
            try {
                // Fetch all items from API
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch items: ${response.statusText}`);
                }
                const allItems: Item[] = await response.json();

                // Get shop inventory from local storage (player object)
                const player = getPlayer();
                const shopInventory = player.shopInventory || []; // Ensure shopInventory exists

                // Filter items to only those that should be shown in inventory
                const filteredShopItems = allItems
                    .filter(item => item.showsInInventory === true) // Only displayable items
                    .map(item => {
                        const shopItem = shopInventory.find((shopItem: ShopInventoryItem) => shopItem.itemID === item.itemID);
                        return {
                            ...item,
                            quantity: shopItem ? shopItem.quantity : 0, // Use shop's quantity if it exists, else 0
                            cost: item.cost // Cost from API
                        };
                    });

                setShopItems(filteredShopItems);
            } catch (error) {
                console.error('Error fetching shop inventory:', error);
            }
        };

        fetchShopItems();
    }, []);

    return (
        <div className={InventoryModule.overlay}>
            <div ref={modalRef} className={InventoryModule.inv_container}>
                <button className={InventoryModule.close_btn} onClick={onClose}>X</button>
                <h2 className={InventoryModule.inventory_title}>Shop Stock</h2>

                <div className={InventoryModule.inventory_list}>
                    {shopItems.map((item) => (
                        <div key={item.itemID} className={InventoryModule.inventory_item}>
                            <img
                                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image.pathToFile}.webp`}
                                alt={item.name}
                                className={InventoryModule.img}
                            />
                            <div className={InventoryModule.item_details}>
                                <p>{item.name}</p>
                                <p>Stock: {item.quantity}x</p>
                                <p>Price: {item.cost} ₣</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopInventory;
