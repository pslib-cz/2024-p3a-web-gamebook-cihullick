import React from 'react';
import { useNavigate } from 'react-router-dom';

const AchievementsButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/achievements')}
            style={{
                fontSize: '16px',
                padding: '10px 20px',
                margin: '10px',
                cursor: 'pointer',
                backgroundColor: '#555',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
            }}
        >
            Achievements
        </button>
    );
};

export default AchievementsButton;
