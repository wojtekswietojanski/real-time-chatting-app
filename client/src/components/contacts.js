import "../styling/contactTemplate/contactTemplate.css";
import foto from "../assets/userImg.png";

const Contacts = () => {
  return (
    <aside className="contacts">
      <div className="contactTemplate">
        <img src={foto} alt="" />
        <p className="username">Imie i nazwisko</p>
        <p className="lastMessage">Ostatnia wiadomość</p>
      </div>
    </aside>
  );
};

export default Contacts;
