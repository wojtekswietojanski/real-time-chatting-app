import "../styling/messageNotification/messageNotification.css";

const MessageNotification = () => {
  return (
    <div id="messageNotification">
      <img
        src="https://icon-library.com/images/notification-icon/notification-icon-3.jpg"
        alt=""
        id="notificationRing"
      />
      <p>New Message</p>
    </div>
  );
};

export default MessageNotification;
