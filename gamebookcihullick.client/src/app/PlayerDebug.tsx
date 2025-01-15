import React, { useEffect, useState } from 'react';
import { getPlayer, addItemToInventory, removeItemFromInventory } from '../services/PlayerService'; // Adjust path
import { Item } from '../types/ItemType';
import BackButton from '../components/buttons/BackButton';

const PlayerDebug: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [player, setPlayer] = useState(getPlayer());

    // Fetch all items from the API
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`)
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    const handleAddItem = (itemID: number) => {
        const updatedPlayer = { ...player };
        addItemToInventory(updatedPlayer, itemID, 1);
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
                            <button onClick={() => handleAddItem(item.itemID)}>Add to Inventory</button>
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
