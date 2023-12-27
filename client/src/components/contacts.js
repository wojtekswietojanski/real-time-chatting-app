import React from "react";
import "../styling/contactTemplate/contactTemplate.css";
import foto from "../assets/userImg.png";

const Contacts = ({ peopleList }) => {
  // Konwersja peopleList na mapę, jeśli peopleList to obiekt
  const mappedPeopleList = Array.isArray(peopleList)
    ? peopleList
    : Object.keys(peopleList).map((userId) => ({
        userId,
        username: peopleList[userId],
      }));

  return (
    <section className="contacts">
      {mappedPeopleList.map(({ userId, username }) => (
        <div className="contactTemplate" key={userId}>
          <img src={foto} alt="" />
          <p className="username">{username}</p>
          <p className="lastMessage">Ostatnia wiadomość</p>
        </div>
      ))}
    </section>
  );
};

export default Contacts;
