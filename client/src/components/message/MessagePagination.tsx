import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useShallow } from "zustand/react/shallow";
import useMessagesStore from "../../stores/messagesStore";

export default function MessagePagination() {
  const { meta, fetchNext, fetchPrev } = useMessagesStore(
    useShallow((state) => ({
      meta: state.meta,
      fetchNext: state.fetchNext,
      fetchPrev: state.fetchPrev,
    })),
  );

  return (
    <div className="sticky bottom-0 bg-white grid grid-cols-2 border-t-4 border-gray-300">
      {meta.prev !== null && meta.prev !== "" ? (
        <button
          type="button"
          className={`${meta.prev === null || meta.prev === "" ? "hidden" : ""} cursor-pointer py-4 hover:bg-gray-300`}
          disabled={meta.prev === null || meta.prev === ""}
          onClick={() => {
            fetchPrev();
          }}
        >
          <FontAwesomeIcon icon={fas.faArrowLeft} />
        </button>
      ) : (
        <div></div>
      )}

      {meta.next !== null && meta.next !== "" ? (
        <button
          type="button"
          className={`${meta.next === null || meta.next === "" ? "hidden" : ""} cursor-pointer py-4 hover:bg-gray-300`}
          disabled={meta.next === null || meta.next === ""}
          onClick={() => {
            fetchNext();
          }}
        >
          <FontAwesomeIcon icon={fas.faArrowRight} />
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
