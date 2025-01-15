import React, { useState, useEffect } from 'react';
import { unlockAdventurerAchievement, getPlayer } from '../services/PlayerService';
import BackButton from '../components/buttons/BackButton';
import { Achievement } from '../types';
import AchievementModule from '../app/achievements.module.css';

const Achievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const player = getPlayer();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/achievements`)
            .then((response) => response.json())
            .then((data) => {
                setAchievements(data);
            })
            .catch((error) => console.error('Error fetching achievements:', error));
    }, []);

    useEffect(() => {
        unlockAdventurerAchievement(player);
    }, [player]);

    const unlockedAchievements = player?.unlockedAchievements || [];

    return (
        <div>
            <h1>Achievements</h1>
            <div className={AchievementModule.container}>
                <BackButton />
                {achievements.length > 0 ? (
                    <ul className={AchievementModule.ach_list}>
                        {achievements.map((achievement) => (
                            <li key={achievement.achievementID} className={AchievementModule.ach}>
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}${achievement.image.pathToFile}.webp`}
                                    alt={achievement.image.name}
                                    className={AchievementModule.ach_img}
                                    style={{
                                        filter: unlockedAchievements.includes(achievement.achievementID)? 'none' : 'grayscale(100%)',
                                    }}/>
                                <div className={AchievementModule.ach_info}>
                                    <p className={AchievementModule.ach_name}>{achievement.name}</p>
                                    <p className={AchievementModule.ach_desc}>
                                        {unlockedAchievements.includes(achievement.achievementID) ? achievement.description: '???'}
                                    </p>
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
