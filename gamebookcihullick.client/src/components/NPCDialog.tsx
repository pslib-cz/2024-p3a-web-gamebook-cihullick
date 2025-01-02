import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayer, savePlayer, removeItemFromInventory } from '../services/PlayerService';
import { NPC } from '../types'

const NPCDialogPage: React.FC = () => {
    const { npcId } = useParams<{ npcId: string }>();
    const navigate = useNavigate();
    const [npc, setNpc] = useState<NPC | null>(null);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
    const player = getPlayer();

    useEffect(() => {
        if (!npcId) return;

        // Fetch NPC data
        fetch(`https://localhost:7054/api/npcs/${npcId}`)
            .then((response) => response.json())
            .then((data) => {
                data.dialog = JSON.parse(data.dialog); // Parse the dialog JSON
                setNpc(data);
            })
            .catch((error) => console.error('Error fetching NPC:', error));
    }, [npcId]);

    const handleOptionClick = (index: number) => {
        if (!npc || !player) return;


        if (npc.requiredItemID && currentDialogIndex === 0 && index === 0) {
            // Check for the required item
            const hasItem = player.inventory.some((item) => item.itemID === npc.requiredItemID);

            if (!hasItem) {
                alert("You don't have the required item!");
                setCurrentDialogIndex(1); // Progress to the "not yet" dialog
                return;
            }

            // Remove the item and progress to the thank-you dialog
            removeItemFromInventory(player, npc.requiredItemID, 1);
            savePlayer(player);
            alert(`${npc.name}: Thank you for the Golden Jelly Bean!`);
            setCurrentDialogIndex(2); // Progress to the thank-you dialog
        } else if (currentDialogIndex < npc.dialog.length - 1) {
            setCurrentDialogIndex(currentDialogIndex + 1); // Progress the dialog
        } else {
            navigate(-1); // End the dialog
        }
    };


    if (!npc) return <div>Loading...</div>;

    const currentDialog = npc.dialog[currentDialogIndex];

    return (
        <div>
            <h1>{npc.name}</h1>
            <p>{currentDialog.text}</p>
            <div>
                {currentDialog.options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(index)}>
                        {option}
                    </button>
                ))}
            </div>
            <button onClick={() => navigate(-1)}>Exit</button>
        </div>
    );
};

export default NPCDialogPage;
