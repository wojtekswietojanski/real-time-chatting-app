import "../styling/sendMessageBar/sendMessageBar.css";

const SendMessageBar = ({ messageContent, setMessageContent, handleSend }) => {
  return (
    <form action="" id="sendMessageForm" onSubmit={handleSend}>
      <input
        type="text"
        placeholder="Send message"
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
      />
    </form>
  );
};

export default SendMessageBar;
