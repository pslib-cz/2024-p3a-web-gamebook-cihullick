import './App.css';
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import AppLayout from './app/AppLayout';
import Menu from './app/Menu';
import House from './components/House';
import Street from './components/Street'; // Import the new Street component

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Menu />, // Start menu
            },
            {
                path: '/house',
                element: <House />, // House page
            },
            {
                path: '/street',
                element: <Street />, // Street page
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
