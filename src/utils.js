import { useEffect, useRef } from "react";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function stringToLines(text, maxLength) {
  const lines = [];
  if (text.length > maxLength) {
    let i = 0;
    text.split(" ").forEach(word => {
      if (
        lines &&
        lines[i] &&
        lines[i].length < maxLength &&
        lines[i].length + word.length + 1 <= maxLength
      ) {
        lines[i] = `${lines[i]} ${word}`;
      } else if (!lines[i]) {
        lines[i] = word;
      } else {
        i += 1;
        lines[i] = word;
      }
    });
  }
  return lines;
}
