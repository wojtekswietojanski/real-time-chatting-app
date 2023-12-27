import "../styling/sendMessageBar/sendMessageBar.css";

const SendMessageBar = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert("ello");
  };

  return (
    <form action="" id="sendMessageForm" onSubmit={handleSubmit}>
      <input type="text" placeholder="Send message" />
    </form>
  );
};

export default SendMessageBar;
