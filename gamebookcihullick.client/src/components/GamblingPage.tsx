import React, { useState } from 'react';
import { getPlayer, savePlayer } from '../services/PlayerService';
import GamblingModule from '../components/gamblingpage.module.css';
import AchievementsButton from './buttons/AchievementsButton';
import SettingsButton from './buttons/SettingsButton';
import MenuButton from './buttons/MenuButton';
import PlayerInventory from './PlayerInventory';
import FooterBar from './FooterBar';

const GamblingPage: React.FC = () => {
    const [wagerPercentage, setWagerPercentage] = useState(10);
    const [result, setResult] = useState<string | null>(null);
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const player = getPlayer();
    const totalMoney = player.money || 0;

    const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) value = 1;
        if (value > 100) value = 100;
        setWagerPercentage(value);
    };

    const wagerAmount = Math.floor((wagerPercentage / 100) * totalMoney);
    const winAmount = totalMoney + wagerAmount;
    const loseAmount = totalMoney - wagerAmount;

    const getWinChance = () => {
        if (wagerPercentage >= 100) return 0.01;
        console.log("oogf")
        const winChance = (-0.4848 * wagerPercentage) + 49.4848;
        return Math.max(0.01, winChance / 100);
    };

    const handleGamble = () => {
        if (totalMoney <= 0) {
            alert("You have no money to gamble!");
            return;
        }

        const winChance = getWinChance();
        const roll = Math.random();

        if (roll < winChance) {
            player.money += wagerAmount;
            setResult(`You won! New balance: ${player.money} F`);
        } else {
            player.money -= wagerAmount;
            setResult(`You lost! New balance: ${player.money} F`);
        }
        savePlayer(player);
    };

    return (
        <div className={ GamblingModule.container }>
            <div className={ GamblingModule.gambba_propagule }>
                <h1>Gamble Your Money</h1>
                <div className={ GamblingModule.propagules }>
                    <div>
                        <form className={ GamblingModule.wager_form }>
                            <label>Wager Percentage (1-100):</label>
                            <input className={ GamblingModule.wager_input }
                                   type="number"
                                   value={wagerPercentage}
                                   onChange={handleWagerChange}
                                   min="1"
                                   max="100"/>
                        </form>
                        <p>Wager Amount: {wagerAmount} F</p>
                        <p>Chance of Winning: {(getWinChance() * 100).toFixed(2)}%</p>
                    </div>

                    <div>
                        <div className={GamblingModule.text_div}>
                            <p>Total money if win:</p>
                            <p className={ GamblingModule.winamount }>{winAmount} F</p>
                        </div>
                        <div className={GamblingModule.text_div}>
                            <p>Total money if lose:</p>
                            <p className={ GamblingModule.loseamount }>{loseAmount} F</p>
                        </div>
                    </div>
                
                    <button onClick={handleGamble} className={ GamblingModule.gamble_time } >
                        Gamble!
                    </button>

                    {result && <p className={ GamblingModule.center } style={{ color: result.startsWith("You won") ? "green" : "red" }}>{result}</p>}
                </div>
            </div>

            <div className={GamblingModule.btns}>
                <AchievementsButton />
                <SettingsButton />
                <MenuButton />
            </div>
            
            {isInventoryOpen && <PlayerInventory onClose={() => setInventoryOpen(false)} />}
            <FooterBar onOpenInventory={() => setInventoryOpen(true)} />
        </div>
    );
};

export default GamblingPage;
