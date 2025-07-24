import { FaShoppingCart, FaThumbtack } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

interface Props {
  notifsParams: Notif[];
  onDeleteNotification: (notificationId: string, jobId: string) => void
}

const iconMap = {
  cart: <FaShoppingCart className="notif-icon-svg" />,
  pin: <FaThumbtack className="notif-icon-svg" />,
};

export default function NotificationsList({ notifsParams, onDeleteNotification }: Props) {
  return (
    <div className="notifications-list">
      {notifsParams.map((notif, index) => (
        <div key={index} className="notification-card">
          <div className="notif-icon">{iconMap[notif.icon ?? "cart"]}</div>
          <div className="notif-content">
            <div className="notif-title">{notif.notifTitle}</div>
            <div className="notif-desc">{notif.notifDesc}</div>
          </div>
          <div className="notif-time">{String(notif.time)}</div>
          {notif._id && notif.jobId && ( // Only show delete button if _id and jobId exist
            <button
              className="delete-notif-button"
              onClick={() => onDeleteNotification(notif._id!, notif.jobId)}
            >
              <FaTimes />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
