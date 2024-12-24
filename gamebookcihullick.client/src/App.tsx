import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './app/Menu';
import LocationPage from './components/Location';

const router = createBrowserRouter([
            {
                index: true,
                element: <Menu />,
            },
            {
                path: '/location/:id',
                element: <LocationPage />,
            },
]);

function App() {
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Gamebook</h1>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
