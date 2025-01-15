import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonModule from '../buttons/button.module.css';

const SettingsButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            className={ButtonModule.btn}
            onClick={() => navigate('/settings')}
        >
            Settings
        </button>
    );
};

export default SettingsButton;
