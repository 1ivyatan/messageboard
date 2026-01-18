import MessageForm from "../../components/message/messageForm/MessageForm";

export default function MessageInputContainer(props: { onSubmit: Function, onError: Function }) {
  return (
    <MessageForm onSubmit={props.onSubmit} onError={props.onError}/>
  );
}