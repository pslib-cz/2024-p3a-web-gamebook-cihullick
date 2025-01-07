import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './app/Menu';
import LocationPage from './components/Location';
import Achievements from './app/Achievements';
import Settings from './app/Settings';
import PlayerDebug from './app/PlayerDebug'
import NPCDialogPage from './components/NPCDialog';

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
        path: '/location',
        element: <LocationPage />,
    },
    {
        path: '/location/:id/npc/:npcid',
        element: <NPCDialogPage />,
    },
    {
        path: '/achievements',
        element: <Achievements />,
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
            <RouterProvider router={router} />
        </>
    );
}

export default App;
