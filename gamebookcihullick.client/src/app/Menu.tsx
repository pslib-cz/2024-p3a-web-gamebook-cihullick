import React from 'react';
import AchievementsButton from '../components/buttons/AchievementsButton';
import SettingsButton from '../components/buttons/SettingsButton';
import PlayerDebugButton from '../components/buttons/PlayerDebugButton';
import NewGameButton from '../components/buttons/NewGameButton';
import ContinueGameButton from '../components/buttons/ContinueGameButton';
import ClearCacheButton from '../components/buttons/ClearCacheButton';
import ExportPlayerButton from '../components/buttons/ExportPlayerButton';
import ImportPlayerButton from '../components/buttons/ImportPlayerButton';

const Menu: React.FC = () => {

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Gamebook</h1>
            <NewGameButton/>
            <ContinueGameButton/>
            <ExportPlayerButton/>
            <ImportPlayerButton/>
            <AchievementsButton/>
            <SettingsButton/>
            <PlayerDebugButton/>
            <ClearCacheButton/>
        </div>
    );
};

export default Menu;
