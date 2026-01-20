import { useShallow } from "zustand/react/shallow";
import MessageForm from "../../components/message/messageForm/MessageForm";
import Timer from "../../components/message/messageForm/Timer";
import useMessagesStore from "../../stores/messagesStore";

export default function MessageInputContainer() {
  const { postDelay } = useMessagesStore(
    useShallow((state) => ({
      postDelay: state.postDelay,
    })),
  );

  return (
    <div>
      <MessageForm />
      {postDelay != null && postDelay > 0 && <Timer />}
    </div>
  );
}
