import { Card } from "antd";
import React from "react";
import { motion } from "framer-motion";
import "../../styles/auth/RoleCard.css";

interface RoleCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
    title,
    description,
    icon,
    onClick,
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={onClick}
        >
            <Card hoverable className="role-card">
                <div className="role-icon">{icon}</div>
                <h3 className="role-title">{title}</h3>
                <p className="role-desc">{description}</p>
            </Card>
        </motion.div>
    );
};
