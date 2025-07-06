import React from "react";

const NotificationsList: React.FC = () => {
  const notifications = [
    { id: 1, title: "Order Due", message: "Order due in 2 days.", time: "9:41 AM" },
    { id: 2, title: "Pinned Item", message: "It has been 6 days since you last pinned this order.", time: "9:41 AM" },
    { id: 3, title: "Order Due", message: "Order due in 7 days.", time: "9:41 AM" },
  ];

  return (
    <div className="notifications-list">
      {notifications.map((notif) => (
        <div key={notif.id} className="notification-item" style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          <div style={{ fontWeight: "bold" }}>{notif.title}</div>
          <div style={{ color: "#555" }}>{notif.message}</div>
          <div style={{ fontSize: "0.8em", color: "#999" }}>{notif.time}</div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;
