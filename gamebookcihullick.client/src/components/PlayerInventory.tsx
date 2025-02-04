import React, { useEffect, useState, useRef } from 'react';
import { getPlayer, consumeItem } from '../services/PlayerService';
import { Item } from '../types/ItemType';
import InventoryModule from '../components/playerinventory.module.css';

interface PlayerInventoryProps {
    onClose: () => void;
}

const PlayerInventory: React.FC<PlayerInventoryProps> = ({ onClose }) => {
    const player = getPlayer();
    const [items, setItems] = useState<(Item & { quantity: number })[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch items: ${response.statusText}`);
                }
                const allItems: Item[] = await response.json();

                const playerInventory = player.inventory
                    .map((invItem) => {
                        const fullItem = allItems.find(item => item.itemID === invItem.itemID);
                        return fullItem ? { ...fullItem, quantity: invItem.quantity } : null;
                    })
                    .filter(item => item !== null) as (Item & { quantity: number })[];

                setItems(playerInventory);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, [player.inventory]);

    const handleConsume = (itemID: number, nutritionalValue: number) => {
        const success = consumeItem(player, itemID, nutritionalValue);
        if (success) {
            const updatedItems = items
                .map(item =>
                    item.itemID === itemID
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0);

            setItems(updatedItems);
        }
    };

    return (
        <div className={InventoryModule.overlay}>
            <div ref={modalRef} className={InventoryModule.inv_container}>
                <button className={InventoryModule.close_btn} onClick={onClose}>X</button>
                <h2 className={InventoryModule.inventory_title}>Your Inventory</h2>

                <div className={InventoryModule.inventory_list}>
                    {items.map((item) => (
                        <div key={item.itemID} className={InventoryModule.inventory_item}>
                            <img
                                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image.pathToFile}.webp`}
                                alt={item.name}
                                className={InventoryModule.img}
                            />
                            <div className={InventoryModule.item_details}>
                                <p>{item.name}</p>
                                <p>{item.quantity}x</p>
                            </div>
                            {item.isEdible && (
                                <button className={InventoryModule.consume_btn} onClick={() => handleConsume(item.itemID, item.nutritionalValue)}>Consume</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayerInventory;
