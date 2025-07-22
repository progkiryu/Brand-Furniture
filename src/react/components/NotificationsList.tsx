import { FaShoppingCart, FaThumbtack } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface Notif {
  _id: string;
  notifTitle: string;
  notifDesc: string;
  time: Date;
  icon?: "cart" | "pin";
  type? : "orderDue" | "general";
}

interface Props {
  notifsParams: Notif[];
  onremoveNotification: (id: string) => void;
}

const iconMap = {
  cart: <FaShoppingCart className="notif-icon-svg" />,
  pin: <FaThumbtack className="notif-icon-svg" />,
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export default function NotificationsList({ notifsParams }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const relevantAndSortedNotifs = [...notifsParams]
  .map(notif => ({ ...notif, time: new Date(notif.time) }))
    .filter(notif => {
      const dueDate = new Date(notif.time);
      dueDate.setHours(0, 0, 0, 0);
      
      const diffTime = dueDate.getTime() - today.getTime();
      const daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (notif.type === "orderDue") {
        return daysUntilDue >= 0 && daysUntilDue <= 7;
      }
      return true;
    })
    .sort((a, b) => {
      const dueDateA = new Date(a.time);
      dueDateA.setHours(0, 0, 0, 0);
      const daysUntilDueA = Math.ceil((dueDateA.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      const dueDateB = new Date(b.time);
      dueDateB.setHours(0, 0, 0, 0);
      const daysUntilDueB = Math.ceil((dueDateA.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (a.type === "orderDue" && b.type !== "orderDue") {
        return -1;
      }
      if (a.type !== "orderDue" && b.type === "orderDue") {
        return 1;
      }
      if (a.type === "orderDue" && b.type === "orderDue") {
        return daysUntilDueA - daysUntilDueB;
      }
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    })

  return (
    <div className="notifications-list">
      {relevantAndSortedNotifs.length === 0 ? (
        <p className="no-notifications">No new notifications.</p>
      ) : (
        relevantAndSortedNotifs.map((notif) => {
          const dueDate = new Date(notif.time);
          dueDate.setHours(0, 0, 0, 0);

          const diffTime = dueDate.getTime() - today.getTime();
          const daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          let notifTitle = notif.notifTitle;
          let notifDescription = notif.notifDesc;

          if (notif.type === "orderDue") {
            notifTitle = "Order Due";
            if (daysUntilDue === 0) {
              notifDescription = `Order due today\n${formatDate(notif.time)}`;
            } else if (daysUntilDue === 1) {
              notifDescription = `Order due in 1 day\n${formatDate(notif.time)}`;
            }
            else {
              notifDescription = `Order due in ${daysUntilDue} days\n${formatDate(notif.time)}`;
            }
          }

          return (
            <div key={notif._id} className="notification-card">
              <div className="notif-icon">
                {iconMap[notif.icon ?? "cart"]}
              </div>
              <div className="notif-content">
                <div className="notif-title">{notifTitle}</div>
                <div className="notif-desc">{notifDescription}</div>
              </div>
              <button
                className="notif-close-button"
                onClick={() => onRemoveNotification(notif._id)}
                aria-label="Remove notification"
              >
                <MdClose />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
