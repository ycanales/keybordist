import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useInterval } from "./utils";
import uuid from "uuid/v1";

import { getDisplayText } from "./MySetups";
import nord from "./nord";

const StyledTyper = styled.div`
  .setup {
    text-transform: uppercase;
    font-size: calc(1rem);
    padding-left: 21px;
    color: ${nord[4]};
  }
  .setup-highlight {
    color: ${nord[15]};
  }
  h2 {
    padding-left: 21px;
    font-weight: 700;
    font-size: 50px;
    margin-bottom: 1em;
  }
  .quote {
    border: 4px dashed #3b4252;
    font-size: 27px;
    position: relative;

    p {
      margin: 0;
      padding: 21px;
      white-space: pre-line;
    }
  }
  textarea {
    font-size: 27px;
    padding: 21px;
  }
`;

const Typer = ({
  randomizeQuote,
  quote,
  myScores,
  setMyScores,
  setupsCount,
  currentSetup,
  ...rest
}) => {
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
    randomizeQuote();
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
      setMyScores(
        myScores.concat([
          {
            uuid: uuid(),
            quoteUuid: quote.uuid,
            setupUuid: currentSetup.uuid,
            date: new Date().toISOString(),
            time,
            wpmRaw,
            wpmString: wpmDisplay,
            words: quote.text.length / 5
          }
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
    <StyledTyper>
      {!started && (
        <p className="setup">
          {currentSetup ? (
            <>
              <span>Typing with&nbsp;</span>
              <span className="setup-highlight">
                {getDisplayText(currentSetup)}
              </span>
            </>
          ) : (
            "No current setup. "
          )}
          <Link to="/my-setups">
            {currentSetup ? "" : setupsCount ? " Select one" : "Add one"}
          </Link>
          .
        </p>
      )}
      {!started && (
        <h2>
          Type to begin. <button onClick={reset}>Another quote?</button>
        </h2>
      )}
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
        style={errInput ? { color: "#B48EAD" } : {}}
      />
    </StyledTyper>
  );
};

export default Typer;
