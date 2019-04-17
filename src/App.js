import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
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

const quote =
  // "There is a theory which states that if ever anyone discovers exactly what the Universe is for and why it is here, it will instantly disappear and be replaced by something even more bizarre and inexplicable. There is another theory which states that this has already happened.";
  "There is a theory which states that if ever anyone discovers.";

const App = () => {
  const [records, setRecords] = useState([]);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [input, setInput] = useState("");
  const [okInput, setOkInput] = useState("");
  const [errInput, setErrInput] = useState("");

  useInterval(
    () => {
      setTime(time + 1);
    },
    started && !finished ? 1000 : null
  );

  const reset = () => {
    setStarted(false);
    setFinished(false);
    setTime(0);
    setWPM(0);
    setInput("");
    setOkInput("");
    setErrInput("");
  };

  const onChange = event => {
    const text = event.target.value;
    setInput(text);

    // Text complete
    if (text === quote) {
      setFinished(true);
      let wpmRaw = (quote.length * 60) / time / 5;
      let wpmString = wpmRaw.toString();
      let wpmDisplay;
      if (wpmString.indexOf(".") !== -1) {
        wpmDisplay = wpmRaw.toFixed(2);
        setWPM(wpmRaw.toFixed(2));
      } else {
        wpmDisplay = wpmString;
        setWPM(wpmString);
      }
      setRecords(
        records.concat([
          { time, wpmRaw, wpmString: wpmDisplay, words: quote.length / 5 }
        ])
      );
    } else if (quote.startsWith(text)) {
      // Text in progress, no typos
      setOkInput(text);
      setErrInput("");
    } else {
      // Text has errors
      setErrInput(text);
    }

    if (!started) {
      setStarted(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p style={{ fontSize: 200 }}>⌨</p>
        {!started && <h2>Type to begin.</h2>}
        {started && finished && (
          <h2>
            Finished in {time} seconds. Your speed was {wpm} WPM.{" "}
            <button onClick={reset}>Restart.</button>
          </h2>
        )}
        {started && !finished && <h2>{time} seconds elapsed.</h2>}
        <div className="quote">
          <p>{quote}</p>
          <p className="progress">{okInput}</p>
        </div>
        <textarea
          value={input}
          onChange={onChange}
          rows="10"
          disabled={finished}
          style={errInput ? { color: "red" } : {}}
        />

        {records.length > 0 && (
          <ul>
            {records.map(r => (
              <li>
                {r.wpmString} WPM - {r.words} words in {r.time} seconds.
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default App;
