import React, { useState, useEffect, useRef } from "react";
import MessageBox from "../../components/message/messageBox/MessageBox";
import { Message } from "../../types/Message";
import Pagination from "../../types/Pagination";

export default function MessagesContainer(props: {messages: Message[]}) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(props.messages);
  }, []);

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
  );
}