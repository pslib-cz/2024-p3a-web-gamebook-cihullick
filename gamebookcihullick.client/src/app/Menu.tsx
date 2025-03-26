import React from 'react';
import AchievementsButton from '../components/buttons/AchievementsButton';
import SettingsButton from '../components/buttons/SettingsButton';
import NewGameButton from '../components/buttons/NewGameButton';
import ContinueGameButton from '../components/buttons/ContinueGameButton';
import MenuModule from '../app/menu.module.css';

const Menu: React.FC = () => {

    return (
        <div className={MenuModule.container}>
            <h1>Washing ------Machine Quest</h1>
            <div className={MenuModule.dial_and_btns}>
                <div className={MenuModule.btn_list}>
                    <NewGameButton />
                    <ContinueGameButton />
                    <AchievementsButton />
                    <SettingsButton />
                </div>
                <div className={MenuModule.dial}></div>
            </div>
        </div>
    );
};

export default Menu;
