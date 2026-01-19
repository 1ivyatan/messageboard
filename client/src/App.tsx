import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "./stores/messagesStore";
import MessagesContainer from "./containers/message/MessagesContainer";
import MessageInputContainer from "./containers/message/MessageInputContainer";

export default function App() {
  const { messages, fetchIndex, fetchNext } = useMessagesStore(
    useShallow((state) => ({
      messages: state.messages,
      fetchIndex: state.fetchIndex,
      fetchNext: state.fetchNext,
    })),
  );

  useEffect(() => {
    fetchIndex();
  }, []);

  return (
    <div>
      <MessageInputContainer />
      <MessagesContainer />
    </div>
  );
}
