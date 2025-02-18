import React from 'react';
import BackButton from '../components/buttons/BackButton';
import ExportPlayerButton from '../components/buttons/ExportPlayerButton';
import ImportPlayerButton from '../components/buttons/ImportPlayerButton';

const Settings: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px', backgroundImage: `url(${import.meta.env.VITE_IMAGE_BASE_URL}sheetmetal.webp)`, }}>
            <h1>Settings</h1>
            <p>Modify your game settings here.</p>
            <ExportPlayerButton />
            <ImportPlayerButton />
            <BackButton />
        </div>
    );
};

export default Settings;
