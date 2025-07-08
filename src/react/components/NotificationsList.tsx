import { useEffect, useState } from "react";

interface NotifProp {
  notifsParams: Array<Notif>
}

function NotificationsList({ notifsParams }: NotifProp) {
  const [ displayedNotifs, setNotifs ] = useState<Array<Notif>>(notifsParams);

  useEffect(() => {
    setNotifs(notifsParams);
  }, [notifsParams]);

  return (
    <div className="notifications-list">
      {displayedNotifs.map((notif: Notif) => (
        <div key={String(notif._id)} className="notification-item" style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
          <div style={{ fontWeight: "bold" }}>{notif.notifTitle}</div>
          <div style={{ color: "#555" }}>{notif.notifDesc}</div>
          <div style={{ fontSize: "0.8em", color: "#999" }}>{String(notif.time)}</div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;
