import React from 'react';
import ButtonModule from '../buttons/button.module.css';

const ClearCacheButton: React.FC = () => {

    const handleClearCache = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <button className={ButtonModule.btn} onClick={handleClearCache}>Clear Save Data</button>
    );
};

export default ClearCacheButton;
