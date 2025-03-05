import React from 'react';
import BackButton from '../components/buttons/BackButton';
import ExportPlayerButton from '../components/buttons/ExportPlayerButton';
import ImportPlayerButton from '../components/buttons/ImportPlayerButton';
import PlayerDebugButton from '../components/buttons/PlayerDebugButton';
import ClearCacheButton from '../components/buttons/ClearCacheButton';
import SettingsModule from '../app/settings.module.css';

const Settings: React.FC = () => {
    return (
        <div className={ SettingsModule.container }>
            <div>
                <div className={ SettingsModule.header }>
                    <h1>Settings</h1>
                    <p>Modify your game settings here.</p>
                </div>

                <div className={ SettingsModule.back }>
                    <BackButton />
                </div>

                <div className={ SettingsModule.settings }>
                    <ExportPlayerButton />
                    <ImportPlayerButton />
                    <PlayerDebugButton />
                    <ClearCacheButton />
                </div>
            </div>
        </div>
    );
};

export default Settings;
