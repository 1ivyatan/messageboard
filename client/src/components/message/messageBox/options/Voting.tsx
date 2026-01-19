import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

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
      <button
        type="button" 
        onClick={(e: any) => handleVote(e, Vote.Up)}
        className={
          (vote === Vote.Up)
            ? "text-white border bg-green-800 border-green-700  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500   dark:focus:ring-green-800"
            : "text-green-700 border border-green-700  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-green-500  dark:hover:bg-green-600 dark:focus:ring-green-800"
        }
      >
        <FontAwesomeIcon icon={fas.faArrowUp}  />
      </button>

        <span> { voteCount } </span>

      
      <button
        type="button" 
        onClick={(e: any) => handleVote(e, Vote.Down)}
        className={
          (vote === Vote.Down)
            ? "text-white border bg-red-800 border-red-700  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500   dark:focus:ring-red-800"
            : "text-red-700 border border-red-700  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:text-red-500  dark:hover:bg-red-600 dark:focus:ring-red-800"
        }
      >
        <FontAwesomeIcon icon={fas.faArrowDown}  />
      </button>
    </div>
  );
}