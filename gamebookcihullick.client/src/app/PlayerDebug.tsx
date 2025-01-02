import React from 'react';
import { clearPlayerData, getPlayer, addItemToInventory, removeItemFromInventory } from '../services/PlayerService';
import BackButton from '../components/buttons/BackButton';

const PlayerDebug: React.FC = () => {
    const player = getPlayer(); // Retrieve the player object from localStorage

    const addTwoTestItems = () => {
        addItemToInventory(player, 1, 2); // Add 2 Golden Beans (ItemID: 1)
        window.location.reload(); // Reload to reflect changes
    };

    const removeTestItem = () => {
        removeItemFromInventory(player, 1, 1);
        window.location.reload();
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Player Debug Page</h1>
            <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px', color: 'black' }}>
                {JSON.stringify(player, null, 2)}
            </pre>

            <h3>Inventory</h3>
            <ul>
                {player.inventory.length > 0 ? (
                    player.inventory.map((item) => (
                        <li key={item.itemID}>
                            Item ID: {item.itemID}, Quantity: {item.quantity}
                        </li>
                    ))
                ) : (
                    <p>No items in inventory.</p>
                )}
            </ul>

            <button onClick={addTwoTestItems}>Add Two Test Items</button>
            <button onClick={removeTestItem}>Remove Test Item</button>
            <button onClick={clearPlayerData}>Reset Player</button>
            <BackButton />
        </div>
    );
};

export default PlayerDebug;
