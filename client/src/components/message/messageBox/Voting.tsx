import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../../stores/messagesStore";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VoteType } from "../../../types/VoteType";
import { useRef, useState } from "react";

export default function Voting(props: { no: number }) {
  const { messages, sendVote } = useMessagesStore(
    useShallow((state) => ({
      messages: state.messages,
      sendVote: state.sendVote,
    })),
  );

  const message = useRef(messages[props.no]);
  const voteData = message.current.votes;

  const [vote, setVote] = useState<VoteType | null>();
  const [count, setCount] = useState<number | null>();

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
    }
  };

  return (
    <div>
      <button type="button" onClick={() => handleVote(VoteType.Up)}>
        <FontAwesomeIcon icon={fas.faArrowUp} />
      </button>
      <span>{count || voteData.count}</span>
      <button type="button" onClick={() => handleVote(VoteType.Down)}>
        <FontAwesomeIcon icon={fas.faArrowDown} />
      </button>
    </div>
  );
}
