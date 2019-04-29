import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import createPersistedState from "use-persisted-state";

import MyQuotes from "./MyQuotes";
import Typer from "./Typer";
import quotes from "./data/quotes";
import "./App.css";
import MySetups from "./MySetups";

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
  const useCurrentSetupState = createPersistedState("currentSetup");
  const [currentSetup, setCurrentSetup] = useCurrentSetupState("");

  const useMyQuotesState = createPersistedState("myQuotes");
  const [myQuotes, setMyQuotes] = useMyQuotesState([]);
  const useMySetupsState = createPersistedState("mySetups");
  const [mySetups, setMySetups] = useMySetupsState([]);
  const [scores, setScores] = useState([]);

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
      setScores(
        scores.concat([
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
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="App-header-menu">
            <p style={{ fontSize: 200 }}>⌨</p>
            <NavLink exact activeClassName="active" to="/">
              Home
            </NavLink>
            <NavLink activeClassName="active" to="/my-quotes">
              My Quotes
            </NavLink>
            <NavLink activeClassName="active" to="/my-setups">
              My Setups
            </NavLink>
          </div>

          <Route
            path="/my-quotes"
            render={props => (
              <MyQuotes {...props} data={myQuotes} set={setMyQuotes} />
            )}
          />
          <Route
            path="/my-setups"
            render={props => (
              <MySetups
                {...props}
                data={mySetups}
                current={currentSetup}
                set={setMySetups}
                setCurrent={setCurrentSetup}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={props => (
              <Typer
                {...props}
                started={started}
                finished={finished}
                time={time}
                wpm={wpm}
                reset={reset}
                quote={quote}
                okInput={okInput}
                onChange={onChange}
                input={input}
                errInput={errInput}
                scores={scores}
                setupsCount={mySetups.length}
                currentSetup={currentSetup}
              />
            )}
          />
        </header>
        <footer>
          created by&nbsp;<a href="http://ycanales.com">ycanales</a>
        </footer>
      </div>
    </Router>
  );
};

export default App;
