import { useEffect, useState } from "react";

export default function Voting(props: any) {
  enum Vote {
    None = "none",
    Up = "up",
    Down = "down"
  }

  const [ vote, setVote ] = useState<Vote>(Vote.None);
  const [ voteCount, setVoteCount ] = useState(0);

  const handleVote = (e: any, newVote: Vote) => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`;

    const method = (vote === Vote.None) 
      ? "POST" 
      : (newVote !== vote)
        ? "PATCH"
        : "DELETE";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vote: newVote
      }),
    })
    .then(async (response) => {
      const data = await response.json();

      if (method === "DELETE") {
        setVote(Vote.None);
      } else {
        setVote(newVote);
      }
    });
  };

  useEffect(() => {
    if (props.votes.clientVote != null) {
      setVote(props.votes.clientVote);
    } else {
      setVote(Vote.None);
    }
    
  }, []);

  useEffect(() => {
    const clientVote: Vote = 
      (props.votes.clientVote) 
        ? props.votes.clientVote
        : Vote.None; 
    
    const neutralCount = props.votes.count + (
      (clientVote === Vote.None)
        ? 0
        : ( clientVote === Vote.Up )
          ? -1
          : 1
    );
    
    switch (vote) {
      case Vote.None:
        setVoteCount(neutralCount);
        break;
      case Vote.Up:
        setVoteCount(neutralCount + 1);
        break;
      case Vote.Down:
        setVoteCount(neutralCount - 1);
        break;
      }
  }, [vote]);

  return (
    <div>
      <button type="button" className={ `${Vote.Up}` } onClick={(e: any) => handleVote(e, Vote.Up)}> Up </button>
        <span> { voteCount } </span>
      <button type="button" className={ `${Vote.Down}` } onClick={(e: any) => handleVote(e, Vote.Down)}> Down </button>
    </div>
  );
}