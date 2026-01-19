import React, { useState, useEffect, useRef } from "react";
import MessageBox from "../../components/message/messageBox/MessageBox";
import { Message } from "../../types/Message";
import Pagination from "../../types/Pagination";

import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../stores/messagesStore";

export default function MessagesContainer() {
  const { messages } = useMessagesStore(
    useShallow((state) => ({
      messages: state.messages,
    })),
  );

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message: Message) => {
        return <p key={"message_" + message._id}>{message.title}</p>;
      })}
    </div>
  );
  //const [messages, setMessages] = useState<Message[]>([]);

  // useEffect(() => {
  //  setMessages(props.messages);
  //}, []);

  /*
  return (
      <div className="flex flex-col gap-4">
        {
          props.messages.map((message: Message) => {
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
  );*/
}
