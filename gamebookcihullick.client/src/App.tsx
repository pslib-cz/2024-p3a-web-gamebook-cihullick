import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './app/AppLayout';
import Menu from './app/Menu';
import House from './app/House';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />, // Main layout for the app
        children: [
            {
                index: true, // Default child route
                element: <Menu />, // Start menu
            },
            {
                path: '/house',
                element: <House />, // House page
            },
        ],
    },
]);

function App() {
    return (
        <>
            <h1>Gamebook</h1>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
