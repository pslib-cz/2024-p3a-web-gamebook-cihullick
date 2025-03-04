import React, { useState, useEffect } from 'react';
import { unlockAdventurerAchievement, getPlayer, unlockWinnerAchievement } from '../services/PlayerService';
import { Achievement } from '../types';
import AchievementModule from '../app/achievements.module.css';
import PlayerInventory from '../components/PlayerInventory';
import FooterBar from '../components/FooterBar';

const Achievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [isInventoryOpen, setInventoryOpen] = useState(false);
    const player = getPlayer();

    useEffect(() => {
        const fetchAchievements = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/achievements`);
            const data = await response.json();
            setAchievements(data);
        };
        fetchAchievements();
    }, []);


    useEffect(() => {
        unlockAdventurerAchievement(player);
        unlockWinnerAchievement(player);
    }, [player]);

    const unlockedAchievements = player?.unlockedAchievements || [];


    return (
        <div>
            <div className={AchievementModule.container} style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}sheetmetal.webp)`,}}>
                <h1>Achievements</h1>
                {achievements.length > 0 ? (
                    <ul className={AchievementModule.ach_list}>
                        {achievements.map((achievement) => (
                            <li key={achievement.achievementID} className={AchievementModule.ach}>
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${achievement.image.pathToFile}.webp`}
                                    alt={achievement.image.name}
                                    className={AchievementModule.ach_img}
                                    style={{ filter: unlockedAchievements.includes(achievement.achievementID)? 'none' : 'grayscale(100%)',}}/>
                                <div className={AchievementModule.ach_info}>
                                    <p className={AchievementModule.ach_name}>{achievement.name}</p>
                                    <p className={AchievementModule.ach_desc}>{unlockedAchievements.includes(achievement.achievementID) ? achievement.description: '???'}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading achievements...</p>
                )}
            </div>
            {isInventoryOpen && <PlayerInventory onClose={() => setInventoryOpen(false)} />}
            <FooterBar onOpenInventory={() => setInventoryOpen(true)} />
        </div>
    );
};

export default Achievements;
