import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import { buyItem, getPlayer } from '../services/PlayerService';
import ShopPageModule from '../components/shoppage.module.css';
import ShopInventoryPage from './ShopInventoryPage';
import ShopFooterBar from './ShopFooterBar';

const ShopPage: React.FC = () => {
    const [shopItems, setShopItems] = useState<(Item & { quantity: number })[]>([]);
    const [shopMoney, setShopMoney] = useState(0);
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const player = getPlayer();

    useEffect(() => {
        const fetchShopItems = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Items`);
                if (!response.ok) throw new Error(`Failed to fetch items: ${response.statusText}`);

                const allItems: Item[] = await response.json();

                // Filter items to only show those in inventory
                const filteredItems = allItems
                    .filter(item => item.showsInInventory === true)
                    .map(item => ({
                        ...item,
                        quantity: 50, // Default quantity for display
                    }));

                setShopItems(filteredItems);
                setShopMoney(player.shopMoney || 0); // Load shop money
            } catch (error) {
                console.error('Error fetching shop items:', error);
            }
        };

        fetchShopItems();
    }, [player.shopMoney]);

    const handleBuyStock = (itemID: number, name: string, cost: number) => {
        if (buyItem(player, itemID, 1, name, cost, 'shop')) {
            setShopMoney(player.shopMoney); // Update UI
        } else {
            alert('Not enough shop money!');
        }
    };

    return (
        <div className={ShopPageModule.thecontainerwithin}>
            <div className={ShopPageModule.inv_title_propagules}>
                <h1>Purchase Stock</h1>
                <p>Shop Money: {shopMoney} F</p>
            </div>

            <div className={ShopPageModule.item_list}>
                {shopItems.map((item) => (
                    <div key={item.itemID} className={ShopPageModule.item}>
                        <img
                            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${item.image?.pathToFile}.webp`}
                            alt={item.name}
                            className={ShopPageModule.img}
                        />
                        <div className={ShopPageModule.item_info}>
                            <h2>{item.name}</h2>
                            <p>Cost: {item.cost} F</p>
                        </div>
                        <button
                            className={ShopPageModule.buy_btn}
                            onClick={() => handleBuyStock(item.itemID, item.name, parseInt(item.cost) )}
                        >
                            Buy Stock
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
