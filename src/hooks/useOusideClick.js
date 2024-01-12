import { useEffect, useRef } from "react";

function useOusideClick(close) {
  //
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [close]);

  return ref;
}

export default useOusideClick;
