import React, { useEffect, useState } from "react";

export default function MessageForm (props: { onSubmit: Function, onError: Function }) {
  const [ title, setTitle ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ cooldown, setCooldown ] = useState(0);

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
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

      if (req.ok) {
        setCooldown(10);
        props.onSubmit("");
      } else {
        const errorMessage = req.status === 429 ? `Too fast, try again in ${req.headers.get("Retry-After")} seconds.` : "Something went wrong!";
        props.onSubmit(errorMessage);
      }
    } catch (e: any) {
      console.log(e)
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCooldown((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [cooldown]);
  
  return (
    <div className="border">
      <form action="#" onSubmit={handleSubmit}>
        <input className="border" type="text" name="title" onChange={handleTitleChange}/>
        <br />
        <textarea className="border" name="message" onChange={handleMessageChange}></textarea>
        <br />
        <button disabled={cooldown !== 0} className="border" type="submit">Submit</button>
        {
          (cooldown > 0) && <span>{ cooldown }</span>
        }
      </form>
    </div>
  );
};