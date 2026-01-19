import { useEffect, useRef, useState } from "react";
import MessagesContainer from "./containers/message/MessagesContainer";
import MessageInputContainer from "./containers/message/MessageInputContainer";
import Pagination from "./types/Pagination";
import Timer from "./components/Timer";
import { Message } from "./types/Message";
import InfoBox from "./components/InfoBox";
import Loading from "./types/Loading";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Data = {
  data: Message[],
  meta: {
    next: String | null,
    prev: String | null
  }
}

type MessageCursor = {
  id: String,
  origin: Pagination
}

export default function App() {
  const [data, setData] = useState<Data>({data: [], meta: { next: null, prev: null }});
  const [status, setStatus] = useState<Loading>(Loading.Loading);

//  const [messageCursor, setMessageCursor] = useState<String>("");

  const [messageCursor, setMessageCursor] = useState<MessageCursor>({id: "", origin: Pagination.None});


  const getDataById = (id: String, direction: Pagination) => {
    let url = `${import.meta.env.VITE_API_BASE || "/api"}/messages`;

    switch (direction) {
      case Pagination.Next: 
        url += `?${Pagination.Next}=${id}`;
        setMessageCursor({id: id, origin: Pagination.None});
        break;
      case Pagination.Prev: 
        url += `?${Pagination.Prev}=${id}`;
        break;
    }

    setMessageCursor({id: id, origin: direction});

    loadData(url);
  }

  const getData = (direction: Pagination) => {
    let url = `${import.meta.env.VITE_API_BASE || "/api"}/messages`;

    switch (direction) {
      case Pagination.None:
        setMessageCursor({id: "", origin: direction});
        break;
      case Pagination.Next: 
        url += `?${direction}=${data.meta.next}`;
        setMessageCursor({id: `${data.meta.next}`, origin: direction});
        break;
      case Pagination.Prev: 
        url += `?${direction}=${data.meta.prev}`;
        setMessageCursor({id: `${data.meta.prev}`, origin: direction});
        break;
    }

    loadData(url);
  }
 
  const loadData = (url: any) => {
    setStatus(Loading.Loading);

    fetch(url)
    .then(async (response) => {
      const newData = await response.json();

      if (response.ok) {
        if (newData.data.length > 0) {
          setStatus(Loading.Done);
        } else {
          setStatus(Loading.Empty);
        }
      } else {
        setStatus(Loading.Error);
      }
      setData(newData);
    }).catch((error) => {
      setStatus(Loading.Error);
    });
  }

  const MessagesBody = () => {
    let body = <></>;
    switch (status) {
      case Loading.Empty:
        body = (
          <InfoBox text="No messages yet" />
        );
        break;
      case Loading.Loading:
        body = (
          <InfoBox text="Loading messages" />
        );
        break;
      case Loading.Done:
        body = (
          <>
            <MessagesContainer messages={data.data}/>
            <div className="mt-3 flex justify-center">
              <button
                className={
                  (data.meta.prev === "" || data.meta.prev === null)
                  ? "cursor-not-allowed py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-400 rounded-full border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                  : "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                } 
                disabled={data.meta.prev === "" || data.meta.prev === null} 
                type="button" 
                onClick={(e: any) => getData(Pagination.Prev)}
                >
                  <FontAwesomeIcon icon={fas.faArrowLeft}  />
              </button>


              <button
                className={
                  (data.meta.next === "" || data.meta.next === null)
                  ? "cursor-not-allowed py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-400 rounded-full border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                  : "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                } 
                disabled={data.meta.next === "" || data.meta.next === null} 
                type="button" 
                onClick={(e: any) => getData(Pagination.Next)}
                >
                  <FontAwesomeIcon icon={fas.faArrowRight}  />
              </button>


              </div>
          </>
        );
        break;
      case Loading.Error:
      default:
        body = (
          <InfoBox text="Something went wrong... Contact the webmaster." />
        );
        break;
    }

    return body;
  };

  const remainingSeconds = useRef(0);
  const delayTime = 30;

  const onSubmitDone = (message: String) => {
    remainingSeconds.current = delayTime;
    getData(Pagination.None);
  };

  const onSubmitError = (message: String) => {
    alert(message);
  };

  const onTimeout = () => {
    if (messageCursor.id.length > 0) {
      getDataById(messageCursor.id, messageCursor.origin);
    } else {
      getData(Pagination.None);
    }
    return status;
  }

  const timer = <Timer cooldown={delayTime} ontimeout={onTimeout} elapsed={remainingSeconds}/>;

  return (
    <div className="max-w-xl mx-auto px-2" style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <MessageInputContainer onSubmit={onSubmitDone} onError={onSubmitError}/>
      { status !== Loading.Error && timer }
      <div>
        <MessagesBody/>
      </div>
    </div>
  );
}
