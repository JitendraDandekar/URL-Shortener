import { memo, useCallback } from "react";
import { useNavigate } from "react-router";

const Header = memo(() => {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/");
    });

    return <header className="dashboard-header">
        <div className="header-content">
            <h1>URL Shortener Dashboard</h1>
            <button onClick={handleLogout} className="logout-btn">
                Logout
            </button>
        </div>
    </header>;
});

export default Header;