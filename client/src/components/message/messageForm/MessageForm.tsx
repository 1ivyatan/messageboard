import { FormEvent, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../../stores/messagesStore";

export default function MessageForm() {
  const { sendMessage } = useMessagesStore(
    useShallow((state) => ({
      sendMessage: state.sendMessage,
    })),
  );

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title.length === 0 || body.length === 0) {
    } else {
      sendMessage(title, body);
    }
  };

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <textarea onChange={(e) => setBody(e.target.value)}></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
