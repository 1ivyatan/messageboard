import React, { useState, useEffect } from "react";
import MessageBox from "../components/MessageBox";

export default function MessagesContainer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE || "/api"}/messages`, {
      method: "GET"
    })
    .then(async (response) => {
      const data = await response.json();
      setData(data);
    });
  }, []);

  return <div className="border">
    {
      data.map((item) => {
        return (
          <MessageBox />
        )
      })
    }
  </div>;
}