import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlayer, savePlayer, removeItemFromInventory } from '../services/PlayerService';
import { NPC, Location } from '../types'

const NPCDialogPage: React.FC = () => {
    const { id, npcid } = useParams<{ id: string; npcid: string }>();
    const navigate = useNavigate();
    const [npc, setNpc] = useState<NPC | null>(null);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
    const player = getPlayer();

    const [data, setData] = useState<Location | null>(null);

    useEffect(() => {
        if (!npcid) return;

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/npcs/${npcid}`)
            .then((response) => response.json())
            .then((data) => {
                data.dialog = JSON.parse(data.dialog);
                setNpc(data);

                if (!player.npcs) player.npcs = {};
                if (!player.npcs[+npcid]) {
                    player.npcs[+npcid] = { dialogStage: 0 };
                    savePlayer(player);
                }
                setCurrentDialogIndex(player.npcs[+npcid].dialogStage);
            })
            .catch((error) => console.error('Error fetching NPC:', error));

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations/${id}`)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                console.log({ id })
                
            })
            .catch((error) => console.error('Error fetching location data:', error));
    }, [id, npcid, player]);


    const handleOptionClick = (index: number) => {

        if (!npc || !player || !npcid) return;



        const npcID = +npcid;
        const currentDialog = npc.dialog[currentDialogIndex];

        if (index === currentDialog.options.length - 1) {
            if (currentDialogIndex === 0) {
                player.npcs[npcID] = { dialogStage: currentDialogIndex + 1 };
                savePlayer(player);
                setCurrentDialogIndex(currentDialogIndex + 1);
                navigate(-1);
                return;
            }
            navigate(-1);
            return;
        }

        if (npc.requiredItemID && (currentDialogIndex === 0 || 1) && index === 0) {
            const hasItem = player.inventory.some((item) => item.itemID === npc.requiredItemID);

            if (!hasItem) {
                alert("You don't have the required item!");
                return;
            }

            removeItemFromInventory(player, npc.requiredItemID, 1);
            savePlayer(player);
            player.npcs[npcID] = { dialogStage: 2 };
            savePlayer(player);
            setCurrentDialogIndex(2);
        } else if (currentDialogIndex < npc.dialog.length - 1) {
            player.npcs[npcID] = { dialogStage: currentDialogIndex + 1 };
            savePlayer(player);
            setCurrentDialogIndex(currentDialogIndex + 1);
        } else {
            navigate(-1);
        }
    };



    if (!npc || !data) return <div>Loading...</div>;

    const currentDialog = npc.dialog[currentDialogIndex];

    return (
        <div
            style={{
                backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}${data.image.pathToFile}.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >
                <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}${npc.image.pathToFile}.webp`} width={100} />
                <h1>{npc.name}</h1>
                <p>{currentDialog.text}</p>
                {currentDialog.options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(index)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>

    );
};

export default NPCDialogPage;
