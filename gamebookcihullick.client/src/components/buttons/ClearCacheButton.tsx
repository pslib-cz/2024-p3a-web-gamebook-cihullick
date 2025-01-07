import React from 'react';

const ClearCacheButton: React.FC = () => {

    const handleClearCache = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <button
            onClick={handleClearCache}
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
            Clear Cache
        </button>
    );
};

export default ClearCacheButton;
