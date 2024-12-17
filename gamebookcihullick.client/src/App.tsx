import './App.css';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import AppLayout from './app/AppLayout';
import Menu from './app/Menu';
import House from './components/House';
import Street from './components/Street';
import Garden from './components/Garden';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Menu />,
            },
            {
                path: '/house',
                element: <House />,
            },
            {
                path: '/street',
                element: <Street />,
            },
            {
                path: '/garden',
                element: <Garden />,
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
