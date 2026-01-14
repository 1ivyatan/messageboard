import { useEffect, useState } from "react";

export default function Voting(props: any) {
  enum Vote {
    None = "none",
    Up = "up",
    Down = "down"
  }

  const [ vote, setVote ] = useState<Vote>(Vote.None);
  const [ voteCount, setVoteCount ] = useState(0);

  const handleVote = (e: any, vote: Vote) => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`;
    const buttonClasses = e.target.classList;
    //const method = (vote === Vote.None) 
    //  ? "POST" 
    //  : (buttonClasses.contains);

    const method = "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vote: vote
      }),
    })
    .then(async (response) => {
      const data = await response.json();
      console.log(props.id)
      console.log(data)
    });
  };

  const getVote = () => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`;

    fetch(url, {
      method: "GET",
    })
    .then(async (response) => {
      const data = await response.json();

      if (data !== null) {
        setVote(data.vote);
      }
      console.log(data)
    });
  };

  useEffect(() => {
    getVote();
  }, []);

  useEffect(() => {

  }, [ vote ]);

  return (
    <div>
      <button type="button" className={ `${Vote.Up}` } onClick={(e: any) => handleVote(e, Vote.Up)}> Up </button>
        <span> { voteCount } </span>
      <button type="button" className={ `${Vote.Down}` } onClick={(e: any) => handleVote(e, Vote.Down)}> Down </button>
    </div>
  );
}