import React, { useState, useEffect, useRef } from "react";
import MessageBox from "../../components/message/messageBox/MessageBox";

import { Message } from "../../types/Message";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../stores/messagesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Status } from "../../types/Status";
import InfoBox from "../../components/InfoBox";

export default function MessagesContainer() {
  const { messages, meta, fetchNext, fetchPrev, fetchIndex, status } =
    useMessagesStore(
      useShallow((state) => ({
        messages: state.messages,
        meta: state.meta,
        fetchNext: state.fetchNext,
        fetchPrev: state.fetchPrev,
        fetchIndex: state.fetchIndex,
        status: state.status,
      })),
    );

  useEffect(() => {
    fetchIndex();

    const eventSource = new EventSource(
      `http://localhost:5173/api/messages/listen`,
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {status === Status.Success ? (
        <div>
          {messages.map((message: Message, index: number) => {
            return <MessageBox key={`message_${message._id}`} no={index} />;
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
      ) : status === Status.Loading ? (
        <InfoBox text="Loading" />
      ) : (
        <InfoBox text="Error loading, contact the webmaster" />
      )}
    </div>
  );
}
