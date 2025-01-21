import { useState, useEffect } from 'react';
import { getPlayer, savePlayer, removeItemFromInventory } from '../services/PlayerService';
import { Customer } from '../types';
import BackButton from './buttons/BackButton';

interface ShopInventoryItem {
    itemID: number;
    quantity: number;
    cost: number;
    name: string;
}

const CustomerPage = (): JSX.Element => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [purchasedItems, setPurchasedItems] = useState<{ itemID: number; name: string; quantity: number; cost: number }[]>([]);
    const [player, setPlayer] = useState(getPlayer());
    const [totalInput, setTotalInput] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [stockWarning, setStockWarning] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [firstCustomer, setFirstCustomer] = useState(true);
    const [shopHasStock, setShopHasStock] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Customers`)
            .then(response => response.json())
            .then(data => {
                setCustomers(data);
                selectRandomCustomer(data);
            })
            .catch(error => console.error('Error fetching customers:', error));
    }, []);


    const selectRandomCustomer = (customerList: Customer[]) => {
        if (customerList.length === 0) return;
        const randomIndex = Math.floor(Math.random() * customerList.length);
        setCustomer(customerList[randomIndex]);
    };

    const handlePurchase = () => {
        if (!customer) return;

        let budget = customer.budget;
        const uniqueItems = new Set<number>();
        const itemsBought: { itemID: number; name: string; quantity: number; cost: number }[] = [];
        const purchaseRecord: Record<number, number> = {};
        const shopInventory = player.shopInventory as ShopInventoryItem[];
        const totalItems = shopInventory.length;
        const maxIterations = 20;
        let iterationCount = 0;


        const affordableItems = shopInventory.filter(i => i.cost <= budget);
        if (affordableItems.length < 3) {
            setShopHasStock(false);
            setStockWarning("Not enough stock in the shop.");
            return;
        }

        while (iterationCount < maxIterations) {
            iterationCount++;

            const randomIndex = Math.floor(Math.random() * totalItems);
            const item = shopInventory[randomIndex];

            if (!item) continue;

            const cost = item.cost;

            if (uniqueItems.size >= 3 && budget < cost) {
                break;
            }

            if (budget >= cost) {
                budget -= cost;

                if (!purchaseRecord[item.itemID]) {
                    purchaseRecord[item.itemID] = 1;
                    uniqueItems.add(item.itemID);
                } else {
                    purchaseRecord[item.itemID]++;
                }
            }
        }

        if (uniqueItems.size < 3) {
            setShopHasStock(false);
            setFeedback("Not enough stock in the shop.");
            return;
        }


        for (const itemID in purchaseRecord) {
            const item = shopInventory.find(i => i.itemID === Number(itemID));
            if (item) {
                itemsBought.push({
                    itemID: item.itemID,
                    name: item.name,
                    quantity: purchaseRecord[item.itemID],
                    cost: item.cost * purchaseRecord[item.itemID]
                });
                removeItemFromInventory(player, item.itemID, purchaseRecord[item.itemID], 'shop');
            }
        }

        setPurchasedItems(itemsBought);
        savePlayer({ ...player, shopInventory: player.shopInventory });
        setPlayer({ ...player });

        setTotalInput("");
        setHasSubmitted(false);
        setFirstCustomer(false);
    };


    const calculateTotal = () => {
        const total = purchasedItems.reduce((sum, item) => sum + item.cost, 0);
        const userTotal = parseInt(totalInput, 10);

        if (!isNaN(userTotal)) {
            if (userTotal === total) {
                setFeedback("Correct! You earned 10% of the total.");
                setPlayer(prev => ({ ...prev, money: Math.round(prev.money + total * 0.1) }));
                savePlayer({ ...player, money: Math.round(player.money + total * 0.1 )});
            } else {
                setFeedback(`Incorrect. The correct total was ${total}.`);
            }
        } else {
            setFeedback("Please enter a valid number.");
        }

        setHasSubmitted(true);
    };

    return (
        <div style={{
            backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}customer.webp)`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100vw',  // Ensure it covers the full width
            height: '100vh', // Ensure it covers the full height of the viewport
            display: 'flex', // Optional: Helps arrange content properly
            flexDirection: 'column', // Aligns content properly
            justifyContent: 'center', // Centers vertically
            alignItems: 'center' // Centers horizontally
        }}>
            <h1 style={{ backgroundColor: 'rgba(0, 0, 0, .5)', }}>Customer Page</h1>
            {customer && (
                <div>
                    <h2>Customer: {customer.name}</h2>
                    <p>Budget: {customer.budget}</p>
                </div>
            )}


            <button
                onClick={() => {
                    handlePurchase();
                    if (shopHasStock) selectRandomCustomer(customers);
                }}
                disabled={!shopHasStock}
            >
                {firstCustomer ? "Start Work" : "Next Customer"}
            </button>

            {purchasedItems.length > 0 && (
                <div style={{ backgroundColor: 'rgba(0, 0, 0, .5)', }}>
                    <h3>Customer Order</h3>
                    <p>{formatCustomerOrder(purchasedItems)}</p>

                    <h3>Enter Total Cost</h3>

                    {!hasSubmitted && (
                        <>
                            <input
                                type="number"
                                value={totalInput}
                                onChange={(e) => setTotalInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && calculateTotal()}
                                placeholder="Enter total amount..."
                            />
                            <button onClick={calculateTotal}>Check Total</button>
                        </>
                    )}

                    {feedback && (
                        <p style={{ color: feedback.startsWith("Correct") ? "green" : "red" }}>
                            {feedback}
                        </p>
                    )}
                    
                </div>
            )}
            {stockWarning && (
                <p style={{ color: "red", fontWeight: "bold" }}>{stockWarning}</p>
            )}
            <BackButton />
        </div>
    );
};

const formatCustomerOrder = (items: { name: string; quantity: number }[]): string => {
    if (items.length === 0) return "";

    const formattedItems = items.map(item => `${item.quantity}x ${item.name}`);

    if (formattedItems.length === 1) {
        return `Hello, I'd like ${formattedItems[0]}.`;
    }

    const lastItem = formattedItems.pop();
    return `Hello, I'd like ${formattedItems.join(", ")} and ${lastItem}.`;
};

export default CustomerPage;