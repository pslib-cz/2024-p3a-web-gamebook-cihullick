import React from 'react';
import ButtonModule from '../buttons/button.module.css';

const ClearCacheButton: React.FC = () => {

    const handleClearCache = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <button
            className={ButtonModule.btn}
            onClick={handleClearCache}
        >
            Clear Cache
        </button>
    );
};

export default ClearCacheButton;
