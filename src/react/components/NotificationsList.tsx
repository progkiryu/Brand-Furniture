import { FaShoppingCart, FaThumbtack } from "react-icons/fa";
import React from "react";

type Notif = {
  icon?: "cart" | "pin";
  title: string;
  description: string;
  time: string;
};

interface Props {
  notifsParams: Notif[];
}

const iconMap = {
  cart: <FaShoppingCart className="notif-icon-svg" />,
  pin: <FaThumbtack className="notif-icon-svg" />,
};

export default function NotificationsList({ notifsParams }: Props) {
  return (
    <div className="notifications-list">
      {notifsParams.map((notif, index) => (
        <div key={index} className="notification-card">
          <div className="notif-icon">
            {iconMap[notif.icon ?? "cart"]}
          </div>
          <div className="notif-content">
            <div className="notif-title">{notif.title}</div>
            <div className="notif-desc">{notif.description}</div>
          </div>
          <div className="notif-time">{notif.time}</div>
        </div>
      ))}
    </div>
  );
}

