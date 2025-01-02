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
        index: true, // Root route for the menu
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
        path: '/locationd/:id/npc/:id',
        element: <NPCDialogPage />,
    },
    {
        path: '/achievements',
        element: <Achievements />, // Add this route for Achievements screen
    },
    {
        path: '/settings',
        element: <Settings />, // Add this route for Settings screen
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
