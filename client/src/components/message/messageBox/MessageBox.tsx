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
  /*return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <p>{ props.title } | { props.timestamp }</p>
      <p>{ props.body }</p>
      <MessageOptions
        id={props.id}
        votes={props.votes}
      />
    </div>
  );*/
}
