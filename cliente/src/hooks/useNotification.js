import { useEffect, useState } from "react";

function useNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/audit-logs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter out logs already notified
        const newLogs = data.filter(
          (log) => !notifications.some((n) => n.Log_ID === log.Log_ID)
        );

        // Show notifications for new logs
        newLogs.forEach((log) => {
          new Notification("Audit Log Notification", {
            body: `${log.Profession} ${log.Username} performed: ${log.Action}`,
          });
        });

        setNotifications((prev) => [...prev, ...newLogs]);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    // Request notification permission and fetch logs
    if (Notification.permission === "granted") {
      fetchNotifications();
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          fetchNotifications();
        }
      });
    }
  }, [notifications]);

  return notifications;
}

export default useNotification;
