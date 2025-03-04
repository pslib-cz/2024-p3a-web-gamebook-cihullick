import React, { useState, useEffect } from 'react';
import { unlockAdventurerAchievement, getPlayer, unlockWinnerAchievement, unlockShopaholicAchievement, unlockGamerAchievement } from '../services/PlayerService';
import { Achievement } from '../types';
import AchievementModule from '../app/achievements.module.css';
import BackButton from '../components/buttons/BackButton';

const Achievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
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
        unlockShopaholicAchievement(player);
        unlockGamerAchievement(player);
    }, [player]);

    const unlockedAchievements = player?.unlockedAchievements || [];


    return (
        <div>
            <div className={AchievementModule.container} style={{ backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}sheetmetal.webp)`, }}>
                <h1>Achievements</h1>

                <div className={AchievementModule.back}>
                    <BackButton />
                </div>

                {achievements.length > 0 ? (
                    <ul className={AchievementModule.ach_list}>
                        {achievements.map((achievement) => (
                            <li key={achievement.achievementID} className={AchievementModule.ach}>
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${achievement.image.pathToFile}.webp`}
                                    alt={achievement.image.name}
                                    className={AchievementModule.ach_img}
                                    style={{ filter: unlockedAchievements.includes(achievement.achievementID) ? 'none' : 'grayscale(100%)', }} />
                                <div className={AchievementModule.ach_info}>
                                    <p className={AchievementModule.ach_name}>{achievement.name}</p>
                                    <p className={AchievementModule.ach_desc}>{unlockedAchievements.includes(achievement.achievementID) ? achievement.description : '???'}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading achievements...</p>
                )}
            </div>
        </div>
    );
};

export default Achievements;