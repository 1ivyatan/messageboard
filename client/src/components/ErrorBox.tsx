import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ErrorBox(props: { text: String }) {
  const [visible, setVisible] = useState<boolean>(true);

  if (visible) {
    return (
      <div>
        <p>{props.text}</p>
        <button type="button" onClick={() => setVisible(false)}>
          <FontAwesomeIcon icon={fas.faXmark} />
        </button>
      </div>
    );
  } else {
    return null;
  }
}
