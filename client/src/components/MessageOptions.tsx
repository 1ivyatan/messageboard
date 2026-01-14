import { useEffect, useState } from "react";

export default function MessageOptions(props: any) {
  const [ upvote, setUpvote ] = useState(false);

  const handleUpvote = (e: any) => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`;

    console.log(url)

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

  });

  return (
    <div className="flex">
      <div>
        <button type="button" onClick={handleUpvote}> Up </button>
          <span> 0 </span>
        <button type="button"> Down </button>
      </div>
    </div>
  );
}