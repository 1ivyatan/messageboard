import React, { useState } from "react";

export default function MessageInput () {
  const [ title, setTitle ] = useState("");
  const [ message, setMessage ] = useState("");

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const req = await fetch(`${import.meta.env.VITE_API_BASE || "/api"}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        body: message
      }),
    });

    const response = await req.json();
    
    console.log(response)
  };

  return (
    <div className="border">
      <form action="#" onSubmit={handleSubmit}>
        <input className="border" type="text" name="title" onChange={handleTitleChange}/>
        <br />
        <textarea className="border" name="message" onChange={handleMessageChange}></textarea>
        <br />
        <button className="border" type="submit">Submit</button>
      </form>
    </div>
  );
};