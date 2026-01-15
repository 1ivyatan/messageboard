import React, { useState, useEffect } from "react";
import MessageBox from "../../components/messageBox/MessageBox";

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
      data.map((item: any) => {
        return (
          <MessageBox
            key={"message_" + item._id}
            id={item._id}
            title={item.title}
            body={item.body}
            timestamp={item.timestamp}
            votes={item.votes}
          />
        )
      })
    }
  </div>;
}