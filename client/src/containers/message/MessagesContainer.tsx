import React, { useState, useEffect, useRef } from "react";
import MessageBox from "../../components/message/messageBox/MessageBox";

export default function MessagesContainer() {
  const [data, setData] = useState([]);

  const [nextMessage, setNextMessage] = useState("");

  const getData = (messageId: String) => {

    fetch(`${import.meta.env.VITE_API_BASE || "/api"}/messages${messageId !== "" ? "?lastId=" + messageId : ""}`, {
      method: "GET"
    })
    .then(async (response) => {
      const data = await response.json();
      
      console.log(data)
      
      console.log(messageId)
      setData(data);
      setNextMessage(data.at(-1)._id);
    });
  };

  useEffect(() => {
    getData("");
  }, []);

  return <div className="border">
    {
      data.map((item: any) => {
        return (
          <MessageBox
            key={"message_" + item._id}
            id={item._id}
            title={item.title}
            body={item.body}
            timestamp={item.timestamp}
            votes={item.votes}
          />
        )
      })
    }

    <div>
      <button type="button" onClick={() => getData(nextMessage)}>Next</button>
    </div>
  </div>;
}