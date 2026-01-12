export default function MessageInput () {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const title = e.target.querySelector("input[name='title']").value;
    const message = e.target.querySelector("textarea[name='message']").value;

    const res = await fetch(`${import.meta.env.VITE_API_BASE || "/api"}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        message: message
      }),
    });

    console.log(res)
  };

  return (
    <div className="border">
      <form action="#" onSubmit={handleSubmit}>
        <input className="border" type="text" name="title" />
        <br />
        <textarea className="border" name="message"></textarea>
        <br />
        <button className="border" type="submit">Submit</button>
      </form>
    </div>
  );
};