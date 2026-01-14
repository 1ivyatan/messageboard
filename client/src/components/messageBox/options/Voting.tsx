import { useEffect, useState } from "react";

export default function Voting(props: any) {
  enum Vote {
    None = "none",
    Up = "up",
    Down = "down"
  }

  const [ vote, setVote ] = useState<Vote>(Vote.None);

  const handleVote = (vote: Vote) => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: vote
      }),
    })
    .then(async (response) => {
      const data = await response.json();
      console.log(data)
    });
  };

  useEffect(() => {

  }, []);

  return (
    <div>
      <button type="button" onClick={() => handleVote(Vote.Up)}> Up </button>
        <span> 0 </span>
      <button type="button" onClick={() => handleVote(Vote.Down)}> Down </button>
    </div>
  );
}