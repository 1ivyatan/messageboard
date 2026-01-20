import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ErrorBox(props: { text: String }) {
  const [visible, setVisible] = useState<boolean>(true);

  if (visible) {
    return (
      <div className="border border-red-300 mb-4 mt-4 box-border px-4 py-2 rounded-sm flex place-content-between">
        <p>{props.text}</p>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="cursor-pointer"
        >
          <FontAwesomeIcon icon={fas.faXmark} />
        </button>
      </div>
    );
  } else {
    return null;
  }
}
