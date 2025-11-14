import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from './containers/Dashboard.jsx';
import Login from './containers/Login.jsx';
import { StrictMode } from 'react';
import SignUp from './containers/SignUp.jsx';

const withAuth = (Component) => {
    return function WrappedComponent(props) {
        const token = localStorage.getItem("token");
        const protectedComponents = ["Dashboard"];
        const authComponents = ["Login", "SignUp"]


        if (!token && protectedComponents.includes(Component.name)) return <Navigate to="/" replace />;
        if (token && authComponents.includes(Component.name)) return <Navigate to="/dashboard" replace />;

        return <Component {...props} />;
    };
};

const ProtectedDashboard = withAuth(Dashboard);
const ProtectedLogin = withAuth(Login);
const ProtectedSignUp = withAuth(SignUp);

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedLogin />,
    },
    {
        path: "/signup",
        element: <ProtectedSignUp />,
    },
    {
        path: "/dashboard",
        element: <ProtectedDashboard />,
    }
]);


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
