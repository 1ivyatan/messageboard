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
      <form action="#" onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <input 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text" 
          name="title" 
          placeholder="Title"
          onChange={handleTitleChange}
          required
        />
        <br />
        <textarea 
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="message"
          onChange={handleMessageChange}
          placeholder="Body"
          required
        ></textarea>
        <br />
        <button 
          disabled={cooldown !== 0} 
          className={
            (cooldown > 0)
            ? "text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            : "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          }
          type="submit"
          >Submit</button>
        {
          (cooldown > 0) && <span>{ cooldown }</span>
        }
      </form>
  );
};