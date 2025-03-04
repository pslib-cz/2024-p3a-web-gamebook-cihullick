import React, { useEffect, useState } from 'react';
import { getPlayer, addItemToInventory, removeItemFromInventory } from '../services/PlayerService';
import { Item } from '../types/ItemType';
import BackButton from '../components/buttons/BackButton';

const PlayerDebug: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [player, setPlayer] = useState(getPlayer());

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`);
            const data = await response.json();
            setItems(data);
        };
        fetchItems();
    }, []);


    const handleAddItem = (itemID: number, name: string, cost: number) => {
        const updatedPlayer = { ...player };
        addItemToInventory(player, itemID, 1, name, cost);
        setPlayer(updatedPlayer);
    };

    const handleRemoveItem = (itemID: number) => {
        const updatedPlayer = { ...player };
        removeItemFromInventory(updatedPlayer, itemID, 1);
        setPlayer(updatedPlayer);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Player Debug Page</h1>
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px', color: 'black' }}>
                {JSON.stringify(player, null, 2)}
            </pre>

            <h3>All Items</h3>
            <ul>
                {items.length > 0 ? (
                    items.map((item) => (
                        <li key={item.itemID}>
                            <p>
                                <strong>{item.name}</strong>: {item.description} (ID: {item.itemID})
                            </p>
                            <button onClick={() => handleAddItem(item.itemID, item.name, parseInt(item.cost))}>Add to Inventory</button>
                            <button onClick={() => handleRemoveItem(item.itemID)}>Remove from Inventory</button>
                            <p>Quantity in Inventory: {player.inventory.find((i) => i.itemID === item.itemID)?.quantity || 0}</p>
                        </li>
                    ))
                ) : (
                    <p>Loading items...</p>
                )}
            </ul>
            <BackButton />
        </div>
    );
};

export default PlayerDebug;
