import { FaShoppingCart, FaThumbtack, FaTimes } from "react-icons/fa";

interface Props {
  notifsParams: Notif[];
  onDeleteNotification: (notifId: string, jobId: string) => void;
}

const iconMap = {
  cart: <FaShoppingCart className="notif-icon-svg" />,
  pin: <FaThumbtack className="notif-icon-svg" />,
};

export default function NotificationsList({ notifsParams, onDeleteNotification }: Props) {
  const sortedNotifs = [...notifsParams].sort(
    (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
  );
  
  return (
    <div className="notifications-list">
            {sortedNotifs.map((notif, index) => ( // Use sortedNotifs here
        <div key={notif._id || index} className="notification-card">
          <div className="notif-icon">{iconMap[notif.icon ?? "cart"]}</div>
          <div className="notif-content">
            <div className="notif-title">{notif.notifTitle}</div>
            <div className="notif-desc">{notif.notifDesc}
              </div>
            <div className="notif-time">{String(new Date(notif.time).toLocaleString())}</div> {/* Format date for better readability */}
          </div>
          <button
            className="delete-notif-button"
            onClick={() => onDeleteNotification(notif._id!, notif.jobId)} // Pass notification ID and jobId
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
}
