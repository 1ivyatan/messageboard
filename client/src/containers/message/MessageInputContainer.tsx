import MessageForm from "../../components/message/messageForm/MessageForm";

export default function MessageInputContainer(props: { onSubmit: Function, onError: Function }) {
  return (
    <div className=" mb-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <MessageForm onSubmit={props.onSubmit} onError={props.onError}/>
    </div>
  );
}