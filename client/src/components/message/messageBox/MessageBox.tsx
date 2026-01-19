import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../../stores/messagesStore";
import Voting from "./Voting";

export default function MessageBox(props: { no: number }) {
  const { messages } = useMessagesStore(
    useShallow((state) => ({
      messages: state.messages,
    })),
  );

  const message = messages[props.no];

  return (
    <div>
      <div>
        <span>{message.title}</span>
        <span>{message.timestamp}</span>
      </div>
      <div>{message.body}</div>
      <div>
        <Voting no={props.no} />
      </div>
    </div>
  );
}
