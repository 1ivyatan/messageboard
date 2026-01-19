import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "./stores/messagesStore";
import MessagesContainer from "./containers/message/MessagesContainer";

export default function App() {
  const { messages, fetch } = useMessagesStore(
    useShallow((state) => ({
      messages: state.messages,
      fetch: state.fetch,
    })),
  );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <MessagesContainer />
    </div>
  );
}
