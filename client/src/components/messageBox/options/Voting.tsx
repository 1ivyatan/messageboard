import { useEffect, useState } from "react";

export default function Voting(props: any) {
  enum Vote {
    None = "none",
    Up = "up",
    Down = "down"
  }

  const [ vote, setVote ] = useState<Vote>(Vote.None);

  const handleUpvote = (e: any) => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "up"
      }),
    })
    .then(async (response) => {
      const data = await response.json();
      console.log(data)
    });
  }

  useEffect(() => {

  }, []);

  return (
    <div>
      <button type="button" onClick={handleUpvote}> Up </button>
        <span> 0 </span>
      <button type="button"> Down </button>
    </div>
  );
}