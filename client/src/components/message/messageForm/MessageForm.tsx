import { FormEvent, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../../stores/messagesStore";

export default function MessageForm() {
  const { sendMessage, postDelay, fetchPostDelay, setPostDelay } =
    useMessagesStore(
      useShallow((state) => ({
        sendMessage: state.sendMessage,
        postDelay: state.postDelay,
        fetchPostDelay: state.fetchPostDelay,
        setPostDelay: state.setPostDelay,
      })),
    );

  const [title, setTitle] = useState<String>("");
  const [body, setBody] = useState<String>("");
  const [canPost, setCanPost] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (title.length === 0 || body.length === 0) {
    } else {
      if (sendMessage(title, body)) {
        setPostDelay(10);
      }
    }
  };

  useEffect(() => {
    fetchPostDelay();
  }, []);

  useEffect(() => {
    if (postDelay != null) {
      if (postDelay > 0) {
        setTimeout(() => {
          setPostDelay(postDelay - 1);
        }, 1000);
        setCanPost(false);
      } else {
        setCanPost(true);
      }
    } else {
      setCanPost(false);
    }
  }, [postDelay]);

  return (
    <form action="#" onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <textarea onChange={(e) => setBody(e.target.value)}></textarea>
      <button disabled={!canPost} type="submit">
        Submit
      </button>
    </form>
  );
}
