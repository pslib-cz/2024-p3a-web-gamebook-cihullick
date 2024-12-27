import React from 'react';
import BackButton from '../components/buttons/BackButton';

const Settings: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Settings</h1>
            <p>Modify your game settings here.</p>
            <BackButton />
        </div>
    );
};

export default Settings;
