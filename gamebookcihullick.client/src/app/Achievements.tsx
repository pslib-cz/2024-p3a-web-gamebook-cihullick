import React, { useState, useEffect } from 'react';
import { unlockAdventurerAchievement, getPlayer } from '../services/PlayerService';
import BackButton from '../components/buttons/BackButton';
import { Achievement } from '../types';

const Achievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const player = getPlayer();

    // Fetch achievements from the API
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/achievements`)
            .then((response) => response.json())
            .then((data) => {
                setAchievements(data);
            })
            .catch((error) => console.error('Error fetching achievements:', error));
    }, []);

    // Unlock adventurer achievement
    useEffect(() => {
        unlockAdventurerAchievement(player);
    }, [player]);

    const unlockedAchievements = player?.unlockedAchievements || [];

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Achievements</h1>
            {achievements.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {achievements.map((achievement) => (
                        <li key={achievement.achievementID} style={{ marginBottom: '20px' }}>
                            <img
                                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${achievement.image.pathToFile}.webp`} // Use the pathToFile from the image object
                                alt={achievement.image.name}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    filter: unlockedAchievements.includes(achievement.achievementID)
                                        ? 'none'
                                        : 'grayscale(100%)',
                                }}
                            />
                            <p>{achievement.name}</p>
                            <p>
                                {unlockedAchievements.includes(achievement.achievementID)
                                    ? achievement.description
                                    : '???'}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                    <p>Loading achievements...</p>
                    
            )}
            <BackButton />
        </div>
    );
};

export default Achievements;
