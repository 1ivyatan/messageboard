export default function MessageOptions(props: any) {
  const handleUpvote = (e: any) => {
    fetch(`${import.meta.env.VITE_API_BASE || "/api"}/messages/${props.id}/vote`, {
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