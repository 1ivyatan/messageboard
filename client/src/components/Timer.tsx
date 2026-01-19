import { useEffect, useState } from "react";
import Loading from "../types/Loading";

export default function Timer(props: {cooldown: any, ontimeout: Function, elapsed: any}) {

  const [cooldown, setCooldown] = useState(0);
  const [ visible, setVisible ] = useState(false);
  
  useEffect(() => {
    let timeout: any;

    if (props.elapsed.current != cooldown) {
        setCooldown(props.elapsed.current);
      setVisible(true);
    } else if (props.elapsed.current > 0) {
      timeout = setTimeout(() => {
        props.elapsed.current = props.elapsed.current - 1;
        setCooldown(props.elapsed.current - 1);
      }, 1000);
      setVisible(true);
    } else {
      setVisible(false);
      if (props.ontimeout() !== Loading.Error) {
        props.elapsed.current = props.cooldown;
        setCooldown(props.cooldown);
      }
    }

    return () => {
      if (timeout != null) {
        clearInterval(timeout);
      }
    };
  }, [cooldown]);

    return (
      <div className="mb-3 gap-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            { (visible && props.elapsed.current > 0) && `New messages in ${props.elapsed.current}` }
      </div>
    );
}