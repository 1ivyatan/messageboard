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
    <div className="flex flex-col justify-center border border-gray-300 mb-4 mt-4 box-border px-4 py-2 rounded-sm">
      <MessageForm />
      {postDelay != null && postDelay > 0 && <Timer />}
    </div>
  );
}
