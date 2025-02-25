import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './app/Menu';
import LocationPage from './components/Location';
import Achievements from './app/Achievements';
import Settings from './app/Settings';
import PlayerDebug from './app/PlayerDebug'
import NPCDialogPage from './components/NPCDialog';
import InventoryPage from './components/InventoryPage'
import CustomerPage from './components/CustomerPage';
import GamblingPage from './components/GamblingPage';
import CutscenePage from './components/CutscenePage'
import GlobalClickHandler from './components/GlobalClickHandler';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Menu />,
        index: true,
    },
    {
        path: '/location/:id',
        element: <LocationPage />,
    },
    {
        path: '/cutscene/:id',
        element: <CutscenePage />,
    },
    {
        path: '/location',
        element: <LocationPage />,
    },
    {
        path: '/location/:id/npc/:npcid',
        element: <NPCDialogPage />,
    },
    {
        path: '/location/:id/inventory/:inventoryid',
        element: <InventoryPage />,
    },
    {
        path: '/achievements',
        element: <Achievements />,
    },
    {
        path: '/customer',
        element: <CustomerPage />,
    },
    {
        path: '/gambba',
        element: <GamblingPage />,
    },
    {
        path: '/settings',
        element: <Settings />,
    },
    {
        path: '/playerdebug',
        element: <PlayerDebug/>,
    },
]);

function App() {
    return (
        <>
            <GlobalClickHandler />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
