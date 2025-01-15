import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonModule from '../buttons/button.module.css';

const AchievementsButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            className={ButtonModule.btn}
            onClick={() => navigate('/achievements')}
        >
            Achievements
        </button>
    );
};

export default AchievementsButton;
