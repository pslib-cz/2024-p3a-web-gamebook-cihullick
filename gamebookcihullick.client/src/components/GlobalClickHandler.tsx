import React, { useEffect } from 'react';
import { getPlayer, savePlayer } from '../services/PlayerService';

const GlobalClickHandler: React.FC = () => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            let hungerLoss = 0;
            const player = getPlayer();

            if (target.tagName === "BUTTON") {
                hungerLoss = Math.floor(Math.random() * 15);
            }
            else if (target.tagName === "IMG") {
                hungerLoss = Math.floor(Math.random() * 25);
            }
            else {
                return;
            }
            player.hunger = Math.max(0, player.hunger - hungerLoss);
            savePlayer(player);

        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);


    return null;
};

export default GlobalClickHandler;
