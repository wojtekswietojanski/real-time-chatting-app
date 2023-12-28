import Contacts from "../components/contacts";
import SearchBar from "../components/searchBar";
import NavButtons from "../components/navButtons";
import SendMessageBar from "../components/sendMessageBar";
import SelectUser from "../components/selectUser";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../userContext";
import "../styling/indexPage/indexPage.css";

const IndexPage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [ws, setWs] = useState(null);
  const [peopleList, setPeopleList] = useState([]);
  const [highligthedComponent, setHighligthedComponent] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [currentChat, setCurrentChat] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) =>
      response.json().then((profile) => {
        setUserInfo(profile);
      })
    );
  }, []);

  //Wiadomościz webSocket
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
    if ("messageData" in msg) {
      console.log(msg.messageData);
    }
  };
  // koniec wiadomości z websocket

  const showPeople = (peopleArray) => {
    const noDups = {};
    peopleArray.forEach(({ userId, username }) => {
      noDups[userId] = username;
    });
    return noDups;
  };

  const handleHighlight = async (id) => {
    setHighligthedComponent(id);
    const res = await fetch("http://localhost:4000/getPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userReading: userInfo.id,
        user2nd: id,
      }),
    });
    const response = await res.json();
    setCurrentChat(response);
  };

  const handleSend = (event) => {
    event.preventDefault();
    try {
      if (highligthedComponent) {
        ws.send(
          JSON.stringify({
            recipient: highligthedComponent,
            text: messageContent,
          })
        );
        setMessageContent("");
      } else {
        console.log("niepodkreślone");
      }
    } catch (error) {
      console.error("Wystąpił błąd podczas wysyłania wiadomości:", error);
    }
  };

  const handleDate = (str) => {
    const modyfiedString = str.replace(/T/g, " ");
    const dotIndex = str.indexOf(".");
    let finalString;
    if (dotIndex != -1) {
      finalString = modyfiedString.substring(0, dotIndex);
    } else {
      return modyfiedString;
    }
    return finalString;
  };

  return (
    <main>
      <aside id="leftAside">
        {userInfo && (
          <div>
            <SearchBar />
            <Contacts
              peopleList={peopleList}
              handleHighlight={handleHighlight}
              highligthedComponent={highligthedComponent}
            />
          </div>
        )}

        <NavButtons />
      </aside>
      <section id="chatSection">
        {highligthedComponent && (
          <>
            <SendMessageBar
              handleSend={handleSend}
              messageContent={messageContent}
              setMessageContent={setMessageContent}
            />
            {currentChat &&
              currentChat.map((msg) =>
                msg.sender === userInfo.id ? (
                  <div key={msg._id} className="yourMessage">
                    {msg.text}
                    <div className="messageDate">
                      {handleDate(msg.createdAt)}
                    </div>
                  </div>
                ) : (
                  <div key={msg._id} className="notYourMessage">
                    {msg.text}
                    <div className="messageDate">
                      {handleDate(msg.createdAt)}
                    </div>
                  </div>
                )
              )}
          </>
        )}
        {!highligthedComponent && <SelectUser />}
      </section>
    </main>
  );
};

export default IndexPage;
