import { memo } from "react";

export const StatCard = memo(({ icon, label, value }) => {
    return <div className="stat-card">
        <div className="stat-icon">{icon}</div>
        <div className="stat-content">
            <p className="stat-label">{label}</p>
            <p className="stat-value">{value}</p>
        </div>
    </div>;
});