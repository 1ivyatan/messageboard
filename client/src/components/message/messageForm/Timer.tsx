import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../../stores/messagesStore";

export default function Timer() {
  const { postDelay } = useMessagesStore(
    useShallow((state) => ({
      postDelay: state.postDelay,
    })),
  );

  return (
    <div>
      <p>{postDelay}</p>
    </div>
  );
}
