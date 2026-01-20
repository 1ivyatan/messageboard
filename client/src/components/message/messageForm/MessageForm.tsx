import { FormEvent, useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../../stores/messagesStore";
import useErrorsStore from "../../../stores/errorsStore";

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

  const { clearSetError, clearErrors } = useErrorsStore(
    useShallow((state) => ({
      clearErrors: state.clearErrors,
      clearSetError: state.clearSetError,
    })),
  );

  const [title, setTitle] = useState<String>("");
  const [body, setBody] = useState<String>("");
  const [canPost, setCanPost] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (title.length === 0 || body.length === 0) {
      clearSetError("Empty fields, write something.");
    } else {
      if (sendMessage(title, body)) {
        setPostDelay(10);
        setTitle("");
        setBody("");
      } else {
        clearSetError("Failed to post!");
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
    <form action="#" onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={`${title}`}
        placeholder="Title"
        className="border"
      />
      <textarea
        onChange={(e) => setBody(e.target.value)}
        value={`${body}`}
        placeholder="Body"
        className="border"
      ></textarea>
      <button
        disabled={!canPost}
        type="submit"
        className="border cursor-pointer hover:bg-black hover:text-white disabled:hover:bg-white disabled:hover:text-black disabled:hover:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}
