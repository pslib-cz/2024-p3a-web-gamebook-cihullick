import React, { useState, useEffect } from 'react';
import { unlockAdventurerAchievement, getPlayer,} from '../services/PlayerService';
import BackButton from '../components/buttons/BackButton';
import { Achievement } from '../types';


const Achievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const player = getPlayer();

    useEffect(() => {
        fetch('https://localhost:7054/api/achievements')
            .then((response) => response.json())
            .then((data) => {
                setAchievements(data);
            })
            .catch((error) => console.error('Error fetching achievements:', error));
    }, []);
    
    


    useEffect(() => {
        unlockAdventurerAchievement(player)
    }, [player]);

    const unlockedAchievements = player?.unlockedAchievements || [];

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Achievements</h1>
            {achievements ? (
                <ul style={{ listStyle: 'none' }}>
                    {achievements.map((achievement) => (
                        <li key={achievement.achievementID}>
                            <img
                                src={`data:image/png;base64,${achievement.image}`}
                                alt={achievement.name}
                                style={{
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
