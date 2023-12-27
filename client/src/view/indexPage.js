import Contacts from "../components/contacts";
import SearchBar from "../components/searchBar";
import NavButtons from "../components/navButtons";
import SendMessageBar from "../components/sendMessageBar";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import "../styling/indexPage/indexPage.css";

const IndexPage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [ws, setWs] = useState(null);
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) =>
      response.json().then((profile) => {
        setUserInfo(profile);
      })
    );
  }, []);

  useEffect(() => {
    if (userInfo) {
      const ws = new WebSocket("ws://localhost:4000");
      setWs(ws);
      ws.addEventListener("message", handleMessage);
    }
  }, [userInfo]);

  const handleMessage = async (event) => {
    const msg = await JSON.parse(event.data);
    if ("online" in msg) {
      setPeopleList(showPeople(msg.online));
    }
  };

  const showPeople = (peopleArray) => {
    const noDups = {};
    peopleArray.forEach(({ userId, username }) => {
      noDups[userId] = username;
    });
    return noDups;
  };

  return (
    <main>
      <aside id="leftAside">
        {userInfo && (
          <div>
            <SearchBar />
            <Contacts peopleList={peopleList} />
          </div>
        )}

        <NavButtons />
      </aside>
      <section id="chatSection">
        <SendMessageBar />
      </section>
    </main>
  );
};

export default IndexPage;
