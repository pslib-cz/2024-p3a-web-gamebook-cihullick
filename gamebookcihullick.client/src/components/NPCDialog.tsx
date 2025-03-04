import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayer, savePlayer, removeItemFromInventory, removeBlockedLocation } from '../services/PlayerService';
import { NPC, Location } from '../types'
import DialogueModule from '../components/npcdialogue.module.css';
import FooterBar from './FooterBar';
import PlayerInventory from './PlayerInventory';

const NPCDialogPage: React.FC = () => {
    const { id, npcid } = useParams<{ id: string; npcid: string }>();
    const navigate = useNavigate();
    const [npc, setNpc] = useState<NPC | null>(null);
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
    const player = getPlayer();
    const [data, setData] = useState<Location | null>(null);

    useEffect(() => {
        if (!id || !npcid) return;

        const fetchLocationData = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}`);
            const result = await response.json();
            setData(result);

            const npcData = result.npCs.find((npc: NPC) => npc.npcid === +npcid);
            if (npcData) {
                npcData.dialog = JSON.parse(npcData.dialog);
                setNpc(npcData);

                if (!player.npcs[+npcid]) {
                    player.npcs[+npcid] = { dialogStage: 0 };
                    savePlayer(player);
                }
                setCurrentDialogIndex(player.npcs[+npcid].dialogStage);
            }
        };
        fetchLocationData();
    }, [id, npcid, player]);


    const handleOptionClick = (index: number) => {
        if (!npc || !player || !npcid || !npc.requiredItemID) return;

        const npcID = +npcid;
        if (currentDialogIndex < npc.dialog.length - 1 && index === 0) {
            const hasItem = player.inventory.some((item) => item.itemID === npc.requiredItemID);
            if (!hasItem) {
                alert("You don't have the required item!");
                return;
            }
            if (npc.type === 1) {
                removeItemFromInventory(player, npc.requiredItemID, 1);
            }
            removeBlockedLocation(player, npc.blockedLocationID);
            player.npcs[npcID] = { dialogStage: 2 };
            savePlayer(player);
            setCurrentDialogIndex(2);
        } else if (currentDialogIndex === 0 && index === 1) {
            player.npcs[npcID] = { dialogStage: currentDialogIndex + 1 };
            savePlayer(player);
            setCurrentDialogIndex(currentDialogIndex + 1);
            navigate(-1);
        } else {
            navigate(-1);
        }
    };

    if (!npc || !data) return <div>Loading...</div>;

    const currentDialog = npc.dialog[currentDialogIndex];

    return (
        <div style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${data.image.pathToFile}.webp)`}} className={DialogueModule.container}>
            <h1>{npc.name}</h1>
            <div className={DialogueModule.npc_container}>
                <img className={DialogueModule.img} src={`${import.meta.env.VITE_IMAGE_BASE_URL}${npc.image.pathToFile}.webp`} />
                <div className={DialogueModule.dialogue_container}>
                    <div className={DialogueModule.dialogue_box}>
                        <p className={DialogueModule.dialogue}>{currentDialog.text}</p>
                    </div>
                    <div className={DialogueModule.dialogue_options}>
                        {currentDialog.options.map((option, index) => (
                            <button className={DialogueModule.option} key={index} onClick={() => handleOptionClick(index)}>{option}</button>
                        ))}
                    </div>
                </div>
            </div>
            {isInventoryOpen && <PlayerInventory onClose={() => setInventoryOpen(false)} />}
            <FooterBar onOpenInventory={() => setInventoryOpen(true)} />
        </div>
    );
};

export default NPCDialogPage;
