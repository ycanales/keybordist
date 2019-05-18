import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import uuid from "uuid/v1";

import { getDisplayText } from "./MySetups";
import TyperClassic from "./TyperClassic";
import { stringToLines, useInterval } from "./utils";
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

    &.quote--split {
      padding: 21px;
      p {
        padding: 0;
        color: ${nord[3]};
        &.quote--active-line {
          color: inherit;
        }
        .quote-word--active {
          color: ${nord[13]};
        }
        .quote-word--done {
          color: ${nord[3]};
        }
        .quote-word--error {
          color: ${nord[11]};
        }
      }
    }
  }
  .quote-citation {
    font-size: 1rem;
    margin-top: 1rem;
    text-align: right;
    color: ${nord[3]};
  }
  textarea {
    font-size: 27px;
    padding: 21px;
  }
  .line-input {
    font-size: 27px;
    margin-top: 8px;
  }
`;

const Typer = ({
  randomizeQuote,
  quote,
  myScores,
  setMyScores,
  setupsCount,
  currentSetup,
  setMenuVisibility,
  ...rest
}) => {
  const [input, setInput] = useState("");
  const [okInput, setOkInput] = useState("");
  const [errInput, setErrInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [wpm, setWPM] = useState(0);

  const [currentLine, setCurrentLine] = useState(0);
  const [lineInput, setLineInput] = useState("");
  const [currentLineWord, setCurrentLineWord] = useState(0);
  const [currentLineTypedWords, setCurrentLineTypedWords] = useState([]);
  const [lineWords, setLineWords] = useState([]);

  const MAX_LENGTH = 70;
  const TYPER = "split";
  const lines = stringToLines(quote.text, MAX_LENGTH);

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
    randomizeQuote();
    setLineInput("");
    setLineWords([]);
    setCurrentLineWord(0);
  };

  const onChangeLine = event => {
    setLineInput(event.target.value);

    // At the beginning of each line, split and store the words.
    if (lineWords.length === 0) {
      setLineWords(lines[currentLine].split(" "));
    }

    // Store typed words and highlight the current word.
    const lineTypedWords = lineInput.split(" ");
    setCurrentLineTypedWords(lineTypedWords);
    const doneWords = lineTypedWords.filter(
      (typedWord, i) => typedWord === lineWords[i]
    );
    setCurrentLineWord(doneWords.length);

    // console.log(
    //   "typing word number",
    //   currentLineWord,
    //   lineTypedWords[currentLineWord]
    // );
    // console.log("should be", lineWords[currentLineWord]);

    if (
      // Every line must end in space...
      (currentLine < lines.length - 1 &&
        event.target.value === lines[currentLine] + " ") ||
      // ...except for the last one.
      (currentLine === lines.length - 1 &&
        event.target.value === lines[currentLine])
    ) {
      // Line is complete.
      setLineInput("");
      setCurrentLine(currentLine + 1);
      setCurrentLineWord(0);
      setCurrentLineTypedWords([]);
      setLineWords([lines[currentLine].split(" ")]);
    }
  };

  const onComplete = () => {
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
    setMenuVisibility(true);
  };

  const wordInProgress = (lineNum, wordNum) =>
    currentLine === lineNum &&
    currentLineWord === wordNum &&
    lineWords[wordNum] &&
    (lineWords[wordNum].indexOf(currentLineTypedWords[wordNum]) !== -1 ||
      !currentLineTypedWords[wordNum]);

  const wordMistyped = (lineNum, wordNum) =>
    currentLine === lineNum &&
    currentLineWord === wordNum &&
    lineWords[wordNum] &&
    lineWords[wordNum].indexOf(currentLineTypedWords[wordNum]) === -1;

  const wordStyle = (lineNum, wordNum) => {
    if (wordInProgress(lineNum, wordNum)) {
      return "quote-word--active";
    }
    if (wordMistyped(lineNum, wordNum)) {
      return "quote-word--error";
    }
    if (currentLine === lineNum && currentLineWord > wordNum) {
      return "quote-word--done";
    }
    return "";
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
      {/*started && !finished && <h2>{time} seconds elapsed.</h2>*/}
      {/*started && !finished && <h2>Typing&hellip;</h2>*/}
      {TYPER === "split" ? (
        <div className="quote quote--split">
          {lines.map((line, i) => (
            <>
              <p
                className={i === currentLine ? "quote--active-line" : ""}
                key={i}
              >
                {line.split(" ").map((word, k) => (
                  <span key={k} className={wordStyle(i, k)}>
                    {word}{" "}
                  </span>
                ))}
              </p>
              {i === currentLine ? (
                <input
                  autoFocus
                  className="line-input"
                  onChange={onChangeLine}
                  value={lineInput}
                />
              ) : null}
            </>
          ))}
        </div>
      ) : TYPER === "classic" ? (
        <TyperClassic
          finished={finished}
          onComplete={onComplete}
          quote={quote}
          setMenuVisibility={setMenuVisibility}
          setStarted={setStarted}
          started={started}
          setInput={setInput}
          setOkInput={setOkInput}
          setErrInput={setErrInput}
          input={input}
          okInput={okInput}
          errInput={errInput}
        />
      ) : null}
    </StyledTyper>
  );
};

export default Typer;
