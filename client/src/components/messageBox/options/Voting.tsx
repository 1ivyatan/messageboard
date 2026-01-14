import { useEffect, useState } from "react";

export default function Voting(props: any) {
  enum Vote {
    None = "none",
    Up = "up",
    Down = "down"
  }

  const [ vote, setVote ] = useState(Vote.None);
  const [ neutralVoteCount, setNeutralVoteCount ] = useState(0);
  const [ displayedVoteCount, setDisplayedVoteCount ] = useState(0);

  const handleVote = (e: any, newVote: Vote) => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`;

    const method = (vote === Vote.None) 
      ? "POST" 
      : (newVote === vote)
        ? "DELETE"
        : "PATCH";

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

  const getVote = () => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`;

    fetch(url)
    .then(async (response) => {
        const data = await response.json();

        if (data != null) {
          setVote(data.vote);

          switch (data.vote) {
            case Vote.None:
              setNeutralVoteCount(props.votes);
              break;
            case Vote.Up:
              setNeutralVoteCount(props.votes - 1);
              break;
            case Vote.Down:
              setNeutralVoteCount(props.votes + 1);
              break;
          }
        }
    });
  };

  useEffect(() => {
    getVote();
    setDisplayedVoteCount(props.votes);
  }, []);

  useEffect(() => {
    switch (vote) {
      case Vote.None:
        setDisplayedVoteCount(neutralVoteCount);
        break;
      case Vote.Up:
        setDisplayedVoteCount(neutralVoteCount + 1);
        break;
      case Vote.Down:
        setDisplayedVoteCount(neutralVoteCount - 1);
        break;
      }
  }, [vote]);

  return (
    <div>
      <button type="button" className={ `${Vote.Up}` } onClick={(e: any) => handleVote(e, Vote.Up)}> Up </button>
        <span> { displayedVoteCount } </span>
      <button type="button" className={ `${Vote.Down}` } onClick={(e: any) => handleVote(e, Vote.Down)}> Down </button>
    </div>
  );
}