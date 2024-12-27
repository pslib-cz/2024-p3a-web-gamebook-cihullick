import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayerDebugButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/playerdebug')}
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
            Player Object
        </button>
    );
};

export default PlayerDebugButton;
