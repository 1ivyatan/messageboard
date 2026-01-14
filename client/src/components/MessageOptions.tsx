export default function MessageOptions() {
  const handleUpvote = (e: any) => {
    alert("up!");
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