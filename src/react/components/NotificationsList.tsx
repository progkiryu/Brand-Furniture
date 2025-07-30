interface Props {
  notifsParams: Notif[];
  onDeleteNotification: (notificationId: string, jobId: string) => void
}


export default function NotificationsList({ notifsParams, onDeleteNotification }: Props) {
  return (
    <div className="notifications-list">
      {notifsParams.map((notif, index) => (
        <div key={index} className="notification-card">
          {/* <div className="notif-icon">{iconMap[notif.icon ?? "cart"]}</div> */}
          <div className="notif-content">
            <div className="notif-title">{notif.notifTitle}</div>
            <div className="notif-desc">{notif.notifDesc}</div>
          </div>
          <div className="notif-time">
            {notif.time ? new Date(notif.time).toLocaleDateString("en-GB") : "—"}
          </div>
          {notif._id && notif.jobId && ( // Only show delete button if _id and jobId exist
            <button
              className="delete-notif-button"
              onClick={() => onDeleteNotification(notif._id!, notif.jobId)}
            >
              x
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
