import "../styling/contactTemplate/contactTemplate.css";
import foto from "../assets/userImg.png";
import { useState, useContext } from "react";
import { UserContext } from "../userContext";

const Contacts = ({ peopleList, handleHighlight, highligthedComponent }) => {
  const { userInfo } = useContext(UserContext);

  // Konwersja peopleList na mapę, jeśli peopleList to obiekt
  const mappedPeopleList = Array.isArray(peopleList)
    ? peopleList
    : Object.keys(peopleList).map((userId) => ({
        userId,
        username: peopleList[userId],
      }));

  // filtrowanie uzytkowników online tak aby nie było widać samego siebie
  const filterMap = mappedPeopleList.filter(
    (people) => people.username != userInfo.username
  );

  return (
    <section className="contacts">
      {filterMap.map(({ userId, username }) => (
        <div
          className={`contactTemplate ${
            highligthedComponent === userId ? "highlithedComponent" : ""
          }`}
          key={userId}
          id={userId}
          onClick={() => {
            handleHighlight(userId);
          }}
        >
          <img src={foto} alt="" />
          <p className="username">{username}</p>
          <p className="lastMessage">Ostatnia wiadomość</p>
        </div>
      ))}
    </section>
  );
};

export default Contacts;
