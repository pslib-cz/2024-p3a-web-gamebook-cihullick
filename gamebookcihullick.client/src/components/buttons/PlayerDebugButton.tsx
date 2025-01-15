import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonModule from '../buttons/button.module.css';

const PlayerDebugButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            className={ButtonModule.btn}
            onClick={() => navigate('/playerdebug')}
        >
            Player Object
        </button>
    );
};

export default PlayerDebugButton;
