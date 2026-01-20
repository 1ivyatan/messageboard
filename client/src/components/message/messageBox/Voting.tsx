import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../../stores/messagesStore";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VoteType } from "../../../types/VoteType";
import { useEffect, useRef, useState } from "react";
import useErrorsStore from "../../../stores/errorsStore";

export default function Voting(props: { no: number }) {
  const { messages, sendVote } = useMessagesStore(
    useShallow((state) => ({
      messages: state.messages,
      sendVote: state.sendVote,
    })),
  );

  const { pushError } = useErrorsStore(
    useShallow((state) => ({
      pushError: state.pushError,
    })),
  );

  const message = useRef(messages[props.no]);
  const voteData = message.current.votes;

  const [vote, setVote] = useState<VoteType | null>();
  const [count, setCount] = useState<number | null>();

  useEffect(() => {
    setVote(voteData.clientVote);
  }, []);

  const handleVote = async (newVote: VoteType) => {
    const oldVote = vote == null ? voteData.clientVote || VoteType.None : vote;

    const success: boolean = await sendVote(
      message.current._id,
      oldVote,
      newVote,
    );

    if (success) {
      const settedVote = newVote === oldVote ? VoteType.None : newVote;

      setVote(settedVote);

      const neutralCount =
        voteData.count +
        (!voteData.clientVote || voteData.clientVote === VoteType.None
          ? 0
          : voteData.clientVote === VoteType.Up
            ? -1
            : 1);

      switch (settedVote) {
        case VoteType.None:
          setCount(neutralCount);
          break;
        case VoteType.Up:
          setCount(neutralCount + 1);
          break;
        case VoteType.Down:
          setCount(neutralCount - 1);
          break;
      }
    } else {
      pushError("Failed to vote");
    }
  };

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => handleVote(VoteType.Up)}
        className={`${vote === VoteType.Up ? "text-green-600" : ""} border cursor-pointer`}
      >
        <FontAwesomeIcon icon={fas.faArrowUp} />
      </button>
      <span
        className={`${(vote === VoteType.Up && "text-green-600") || (vote === VoteType.Down && "text-red-600")}`}
      >
        {count || voteData.count}
      </span>
      <button
        type="button"
        onClick={() => handleVote(VoteType.Down)}
        className={`${vote === VoteType.Down ? "text-red-600" : ""} border cursor-pointer`}
      >
        <FontAwesomeIcon icon={fas.faArrowDown} />
      </button>
    </div>
  );
}
