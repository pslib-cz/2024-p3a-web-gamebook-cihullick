import MenuButton from './buttons/MenuButton';
import styles from './deathscreenpage.module.css';

const DeathScreenPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>you died</h1>
            <p className={styles.text}>of hunger</p>
            <p className={styles.tinytext}>the end</p>
            <MenuButton />
        </div>
    );
}

export default DeathScreenPage;
