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
    <div>
      <button
        type="button"
        className={`${meta.prev === null || meta.prev === "" ? "hidden" : ""}`}
        disabled={meta.prev === null || meta.prev === ""}
        onClick={() => {
          fetchPrev();
        }}
      >
        <FontAwesomeIcon icon={fas.faArrowLeft} />
      </button>
      <button
        type="button"
        className={`${meta.next === null || meta.next === "" ? "hidden" : ""}`}
        disabled={meta.next === null || meta.next === ""}
        onClick={() => {
          fetchNext();
        }}
      >
        <FontAwesomeIcon icon={fas.faArrowRight} />
      </button>
    </div>
  );
}
