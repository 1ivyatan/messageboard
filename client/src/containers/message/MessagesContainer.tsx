import React, { useState, useEffect, useRef } from "react";
import MessageBox from "../../components/message/messageBox/MessageBox";
import { Message } from "../../types/Message";

export default function MessagesContainer() {
  enum Pagination {
    Prev = "firstId",
    Next = "lastId",
    None = ""
  }

  const [nextMessageId, setNextMessageId] = useState<String>("");
  const [prevMessageId, setPrevMessageId] = useState<String>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const getData = (direction: Pagination) => {
    let url = `${import.meta.env.VITE_API_BASE || "/api"}/messages`;

    switch (direction) {
      case Pagination.None: break;
      case Pagination.Next: url += `?${Pagination.Next}=${nextMessageId}`; break;
      case Pagination.Prev: url += `?${Pagination.Prev}=${prevMessageId}`; break;
    }

    fetch(url)
    .then(async (response) => {
      const data = await response.json();
      const items = data.data;
      const meta = data.meta;

      setNextMessageId(meta.next || "");
      setPrevMessageId(meta.prev || "");
      setMessages(items);
    });
  }

  useEffect(() => {
    getData(Pagination.None);
  }, [])

  return (

    <div className="border">
      <div>
        {
          messages.map((message: Message) => {
            return (
              <MessageBox
                key={"message_" + message._id}
                id={message._id}
                title={message.title}
                body={message.body}
                timestamp={message.timestamp}
                votes={message.votes}
              />
            );
          })
        }
      </div>
      <div>
        <button disabled={prevMessageId === ""} type="button" onClick={(e: any) => getData(Pagination.Prev)}>Prev</button>
        <button disabled={nextMessageId === ""} type="button" onClick={(e: any) => getData(Pagination.Next)}>Next</button>
      </div>
    </div>
  );
}