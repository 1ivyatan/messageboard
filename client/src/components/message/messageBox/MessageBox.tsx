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
    <div className="border border-gray-300 mb-4 box-border px-4 py-2 rounded-sm">
      <div className="flex place-content-between">
        <span className="font-bold">{message.title}</span>
        <span>{message.timestamp}</span>
      </div>
      <div>{message.body}</div>
      <div className="flex flex-row-reverse">
        <Voting no={props.no} />
      </div>
    </div>
  );
}
