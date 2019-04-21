import React, { useState, useEffect, useRef } from "react";
import MyQuotes from "./MyQuotes";
import quotes from "./data/quotes";
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

const App = () => {
  const [quote, setQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [myQuotes, setMyQuotes] = useState([]);
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
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const onChange = event => {
    const text = event.target.value;
    setInput(text);

    // Text complete
    if (text === quote.text) {
      setFinished(true);
      let wpmRaw = (quote.text.length * 60) / time / 5;
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
          { time, wpmRaw, wpmString: wpmDisplay, words: quote.text.length / 5 }
        ])
      );
    } else if (quote.text.startsWith(text)) {
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
        <div className="App-header-menu">
          <p style={{ fontSize: 200 }}>⌨</p>
          <button>My Quotes</button>
        </div>

        <MyQuotes data={myQuotes} set={setMyQuotes} />

        {!started && <h2>Type to begin.</h2>}
        {started && finished && (
          <h2>
            Finished in {time} seconds. Your speed was {wpm} WPM.{" "}
            <button onClick={reset}>Restart.</button>
          </h2>
        )}
        {started && !finished && <h2>{time} seconds elapsed.</h2>}
        <div className="quote">
          <p>{quote.text}</p>
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
