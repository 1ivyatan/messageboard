import React, { useState, useEffect, useRef } from "react";
import MessageBox from "../../components/message/messageBox/MessageBox";
import { Message } from "../../types/Message";

export default function MessagesContainer() {
  enum Pagination {
    Prev = "firstId",
    Next = "lastId"
  }

  const [data, setData] = useState<Message[]>([]);

  const [nextMessage, setNextMessage] = useState<String>("");
  const [prevMessage, setPrevMessage] = useState<String>("");

  const getData = (messageId: String, direction: Pagination) => {

    fetch(`${import.meta.env.VITE_API_BASE || "/api"}/messages${messageId !== "" ? "?" + direction + "=" + messageId : ""}`, {
      method: "GET"
    })
    .then(async (response) => {
      const items = await response.json();

      setData(items);
      setPrevMessage(items.at(0)._id);
      setNextMessage(items.at(-1)._id);
    });
  };

  useEffect(() => {
    getData("", Pagination.Next);
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
      <button type="button" onClick={() => getData(prevMessage, Pagination.Prev)}>Previous</button>
      <button type="button" onClick={() => getData(nextMessage, Pagination.Next)}>Next</button>
    </div>
  </div>;
}