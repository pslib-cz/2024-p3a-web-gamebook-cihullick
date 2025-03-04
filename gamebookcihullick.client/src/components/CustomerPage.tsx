import { useState, useEffect } from 'react';
import { getPlayer, savePlayer, removeItemFromInventory } from '../services/PlayerService';
import { Customer, ShopInventoryItem } from '../types';
import CustomerModule from '../components/customerpage.module.css';
import ShopFooterBar from './ShopFooterBar';
import ShopInventoryPage from './ShopInventoryPage';


const CustomerPage = (): JSX.Element => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [purchasedItems, setPurchasedItems] = useState<ShopInventoryItem[]>([]);
    const [player, setPlayer] = useState(getPlayer());
    const [totalInput, setTotalInput] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [stockWarning, setStockWarning] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [firstCustomer, setFirstCustomer] = useState(true);
    const [shopHasStock, setShopHasStock] = useState(true);
    const [isInventoryOpen, setInventoryOpen] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Customers`);
            const data = await response.json();
            setCustomers(data);
        };

        fetchCustomers();
    }, []);



    const selectRandomCustomer = (customerList: Customer[]) => {
        if (customerList.length === 0) return;
        const randomIndex = Math.floor(Math.random() * customerList.length);
        const newCustomer = customerList[randomIndex];
        setCustomer(newCustomer);
        handlePurchase(newCustomer);
    };

    const handlePurchase = (currentCustomer: Customer) => {
        if (!currentCustomer) return;
        setFeedback(null);
        let budget = currentCustomer.budget;
        const uniqueItems = new Set<number>();
        const itemsBought: ShopInventoryItem[] = [];
        const shopInventory = player.shopInventory;
        const totalItems = shopInventory.length;
        const maxIterations = 80;
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
            if (uniqueItems.size >= 3 && budget < cost) break;

            if (budget >= cost) {
                budget -= cost;

                const existingItem = itemsBought.find(i => i.itemID === item.itemID);
                if (existingItem) {
                    existingItem.quantity++;
                    existingItem.cost += item.cost;
                } else {
                    itemsBought.push({
                        itemID: item.itemID,
                        name: item.name,
                        quantity: 1,
                        cost: item.cost
                    });
                    uniqueItems.add(item.itemID);
                }
                removeItemFromInventory(player, item.itemID, 1, 'shop');
            }
        }


        if (uniqueItems.size < 3) {
            setShopHasStock(false);
            setFeedback("Not enough stock in the shop.");
            return;
        }
        console.log("items bought:", itemsBought);


        setPurchasedItems(itemsBought);
        setPlayer({ ...player });
        savePlayer(player);

        setTotalInput("");
        setHasSubmitted(false);
        setFirstCustomer(false);
    };


    const calculateTotal = () => {
        const total = purchasedItems.reduce((sum, item) => sum + item.cost, 0);
        const userTotal = parseInt(totalInput);

        if (!isNaN(userTotal)) {
            if (userTotal === total) {
                setFeedback("Correct! You earned 10% of the total.");
                player.money = Math.round(player.money + total * 0.1);
                player.shopMoney = Math.round(player.money + total * 0.53);
                setPlayer({ ...player });
                savePlayer(player);
            } else {
                setFeedback(`Incorrect. The correct total was ${total}.`);
            }
        } else {
            setFeedback("Please enter a valid number.");
            return;
        }
        setHasSubmitted(true);
    };

    const formatCustomerOrder = (items: ShopInventoryItem[]): string => {
        if (items.length === 0) return "";

        const formattedItems = items.map(item => `${item.quantity}x ${item.name}`);

        if (formattedItems.length === 1) {
            return `Hello, I'd like ${formattedItems[0]}.`;
        }

        const lastItem = formattedItems.pop();
        return `Hello, I'd like ${formattedItems.join(", ")} and ${lastItem}.`;
    };
    

    return (
        <div style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}customer.webp)` }} className={CustomerModule.container}>
            {firstCustomer && (
                <button onClick={() => {if (shopHasStock) selectRandomCustomer(customers);}} disabled={!shopHasStock} className={CustomerModule.start_work}>Start work</button>
            )}
            {customer && purchasedItems.length > 0 && (<h2>{customer.name}</h2>)}

            <div className={CustomerModule.npc_container}>
            {customer && purchasedItems.length > 0 && (<img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${customer.image.pathToFile}.webp`} className={CustomerModule.img} />)}
                   
                <div className={CustomerModule.dialogue_container}>
                    {purchasedItems.length > 0 && (
                        <div className={CustomerModule.dialogue_box}>
                            <p>{formatCustomerOrder(purchasedItems)}</p>
                            <div className={CustomerModule.dialogue_input}>
                                {stockWarning && (<p style={{ color: "red", fontWeight: "bold" }}>{stockWarning}</p>)}
                                {feedback && (<p style={{ color: feedback.startsWith("Correct") ? "green" : "red" }}>{feedback}</p>)}

                                {!hasSubmitted && (
                                    <input type="number"
                                           value={totalInput}
                                           onChange={(e) => setTotalInput(e.target.value)}
                                           onKeyDown={(e) => e.key === 'Enter' && calculateTotal()}
                                           placeholder="Enter total price..."
                                           className={CustomerModule.price_input}/>
                                )}
                            </div>
                        </div>
                    )}
                    <div className={CustomerModule.dialogue_options}>
                        {purchasedItems.length > 0 && (
                            <>
                                {!hasSubmitted && (<button onClick={calculateTotal} className={CustomerModule.option}>Check Total</button>)}
                                {hasSubmitted && (< button onClick={() => { if (shopHasStock) selectRandomCustomer(customers); }} disabled={!shopHasStock} className={CustomerModule.option}>Next customer</button>)}
                            </>
                        )}
                    </div>
                </div>
            </div>
            {isInventoryOpen && <ShopInventoryPage onClose={() => setInventoryOpen(false)} />}
            <ShopFooterBar onOpenInventory={() => setInventoryOpen(true)} />
        </div>
    );
};

export default CustomerPage;