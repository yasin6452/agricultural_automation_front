import { Card } from "antd";
import { ReactNode } from "react";
import "@/styles/auth/SelectRole.css";

interface RoleCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    active?: boolean;
    onClick: () => void;
}

export const RoleCard = ({ title, description, icon, active, onClick }: RoleCardProps) => {
    return (
        <Card
            hoverable
            className={`role-card ${active ? "selected" : ""}`}
            onClick={onClick}
        >
            <div className="role-icon-wrapper">
                <div className="role-icon">{icon}</div>
            </div>
            <div className="role-info">
                <h4>{title}</h4>
                <p>{description}</p>
            </div>
            {active && (
                <div className="role-check">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#52c41a" />
                        <path
                            d="M7 12L10 15L17 8"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}
        </Card>
    );
};
