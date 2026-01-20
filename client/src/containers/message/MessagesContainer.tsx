import React, { useState, useEffect, useRef } from "react";
import MessageBox from "../../components/message/messageBox/MessageBox";

import { Message } from "../../types/Message";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../stores/messagesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Status } from "../../types/Status";
import InfoBox from "../../components/InfoBox";
import useErrorsStore from "../../stores/errorsStore";
import { Cursor } from "../../types/Cursor";
import MessagePagination from "../../components/message/MessagePagination";

export default function MessagesContainer() {
  const { messages, fetchIndex, status, fetchByCursor } = useMessagesStore(
    useShallow((state) => ({
      messages: state.messages,
      fetchIndex: state.fetchIndex,
      status: state.status,
      fetchByCursor: state.fetchByCursor,
    })),
  );

  const { clearSetError } = useErrorsStore(
    useShallow((state) => ({
      clearSetError: state.clearSetError,
    })),
  );

  const [cursor, setCursor] = useState<Cursor | null>(null);

  useEffect(() => {}, [messages]);

  useEffect(() => {
    fetchIndex();

    const newMessageListener = new EventSource(
      `${import.meta.env.VITE_API_BASE || "/api"}/messages/listen`,
    );

    newMessageListener.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data._id) {
          fetchByCursor();
        }
      } catch (e: any) {
        clearSetError("Erroneous message from the server.");
      }
    };

    return () => newMessageListener.close();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {status === Status.Success ? (
        <div>
          {messages.map((message: Message, index: number) => {
            return <MessageBox key={`message_${message._id}`} no={index} />;
          })}
          <MessagePagination />
        </div>
      ) : status === Status.Loading ? (
        <InfoBox text="Loading" />
      ) : (
        <InfoBox text="Error loading, contact the webmaster" />
      )}
    </div>
  );
}
