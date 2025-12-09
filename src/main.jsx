import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'aos/dist/aos.css';
import AOS from 'aos';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from './pages/Admin.jsx';
AOS.init();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/crud',
        element: <Admin />
    },
    {
        path: '/',
        element: <App />
    },
    
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)