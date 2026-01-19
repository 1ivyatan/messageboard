import React, { useState, useEffect, useRef } from "react";
import MessageBox from "../../components/message/messageBox/MessageBox";
import { Message } from "../../types/Message";
import Pagination from "../../types/Pagination";

import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../stores/messagesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default function MessagesContainer() {
  const { messages, meta, fetchNext, fetchPrev } = useMessagesStore(
    useShallow((state) => ({
      messages: state.messages,
      meta: state.meta,
      fetchNext: state.fetchNext,
      fetchPrev: state.fetchPrev,
    })),
  );

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message: Message) => {
        return <p key={"message_" + message._id}>{message.title}</p>;
      })}

      <div>
        <button
          type="button"
          disabled={meta.prev === null || meta.prev === ""}
          onClick={fetchPrev}
        >
          <FontAwesomeIcon icon={fas.faArrowLeft} />
        </button>
        <button
          type="button"
          disabled={meta.next === null || meta.next === ""}
          onClick={fetchNext}
        >
          <FontAwesomeIcon icon={fas.faArrowRight} />
        </button>
      </div>
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
