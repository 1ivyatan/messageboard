export default function MessageInput () {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e)
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