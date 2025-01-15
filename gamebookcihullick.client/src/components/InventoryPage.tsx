import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Inventory } from '../types/InventoryType';
import ShopPage from './ShopPage';

const InventoryPage: React.FC = () => {
    const { inventoryid } = useParams<{ inventoryid: string }>();
    const [inventory, setInventory] = useState<Inventory | null>(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Inventories/${inventoryid}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch inventory: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data: Inventory) => {
                setInventory(data);
            })
            .catch((error) => {
                console.error('Error fetching inventory:', error);
            });
    }, [inventoryid]);

    if (!inventory) return <p>Loading...</p>;

    const renderContent = () => {
        switch (inventory.type) {
            case 1:
                return <ShopPage />;
            case 2:
                return <p>OrderPage coming soon...</p>;
            case 3:
                return <p>StoragePage coming soon...</p>;
            default:
                return <p>Invalid inventory type.</p>;
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${inventory.image.pathToFile}.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '120vh',
                padding: '20px',
                color: 'gainsboro',
            }}>
            {renderContent()}
        </div>
    );
};

export default InventoryPage;
