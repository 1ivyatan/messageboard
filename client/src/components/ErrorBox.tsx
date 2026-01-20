import { useState } from "react";

export default function ErrorBox(props: { text: String }) {
  const [visible, setVisible] = useState<boolean>(true);

  if (visible) {
    return (
      <div>
        <p>{props.text}</p>
        <button type="button" onClick={() => setVisible(false)}>
          X
        </button>
      </div>
    );
  } else {
    return null;
  }
}
