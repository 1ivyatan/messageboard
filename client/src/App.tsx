import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "./stores/messagesStore";
import MessagesContainer from "./containers/message/MessagesContainer";
import MessageInputContainer from "./containers/message/MessageInputContainer";
import ErrorBoxesContainer from "./containers/ErrorBoxesContainer";

export default function App() {
  return (
    <div>
      <ErrorBoxesContainer />
      <MessageInputContainer />
      <MessagesContainer />
    </div>
  );
}
