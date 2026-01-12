export default function MessageInput () {
  const handleSubmit = async (e: any) => {
    console.log(e)
  };

  return (
    <div className="border">
      <form action="#" onSubmit={handleSubmit}>
        <input className="border" type="text" />
      </form>
    </div>
  );
};