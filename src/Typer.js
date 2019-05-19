import React, { useState } from "react";
import styled from "styled-components";
import uuid from "uuid/v1";

import TyperClassic from "./TyperClassic";
import TyperHeader from "./TyperHeader";
import TyperInline from "./TyperInline";
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
    // Don't allow more than one space.
    if (
      event.target.value[event.target.value.length - 1] === " " &&
      event.target.value[event.target.value.length - 2] === " "
    ) {
      return;
    }
    setLineInput(event.target.value);

    if (!started && !finished) {
      setStarted(true);
    }

    // At the beginning of each line, split and store the words.
    if (lineWords.length === 0) {
      setLineWords(lines[currentLine].split(" "));
    }

    // Store typed words and highlight the current word.
    const lineTypedWords = event.target.value.split(" ");
    setCurrentLineTypedWords(lineTypedWords);
    const doneWords = lineTypedWords.filter(
      (typedWord, i) => typedWord === lineWords[i]
    );
    setCurrentLineWord(doneWords.length);

    if (
      currentLine < lines.length - 1 &&
      event.target.value === lines[currentLine] + " "
    ) {
      // Line is complete.
      setLineInput("");
      setCurrentLineWord(0);
      setCurrentLineTypedWords([]);
      setLineWords(lines[currentLine + 1].split(" "));
      setCurrentLine(currentLine + 1);
    } else if (
      // ...except for the last one.
      currentLine === lines.length - 1 &&
      event.target.value === lines[currentLine]
    ) {
      // quote is complete
      onComplete();
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

  const wordMistyped2 = (lineNum, wordNum) =>
    currentLine === lineNum &&
    currentLineWord === wordNum &&
    lineWords[wordNum] &&
    lineWords[wordNum].indexOf(currentLineTypedWords[wordNum]) === -1;

  const wordMistyped = (lineNum, wordNum) => {
    const lineMatch = currentLine === lineNum;
    const wordMatch = currentLineWord === wordNum;
    const word = lineWords[wordNum];
    const mistyped =
      !word || !currentLineTypedWords[wordNum]
        ? false
        : word.indexOf(currentLineTypedWords[wordNum]) === -1;

    /*if (lineMatch && wordMatch) {
      console.log("");
      console.log("line input", lineInput);
      console.log("current line typed words", currentLineTypedWords);
      console.log("typing word: ", currentLineTypedWords[wordNum]);
      console.log(
        "lineMatch",
        lineMatch,
        "wordMatch",
        wordMatch,
        "word",
        word,
        "mistyped",
        mistyped
      );
    }*/

    return lineMatch && wordMatch && word && mistyped;
  };

  const wordStyle = (lineNum, wordNum) => {
    if (wordMistyped(lineNum, wordNum)) {
      return "quote-word--error";
    }

    if (wordInProgress(lineNum, wordNum)) {
      return "quote-word--active";
    }

    if (currentLine === lineNum && currentLineWord > wordNum) {
      return "quote-word--done";
    }
    return "";
  };

  return (
    <StyledTyper>
      <TyperHeader
        started={started}
        finished={finished}
        currentSetup={currentSetup}
        setupsCount={setupsCount}
        reset={reset}
        time={time}
        wpm={wpm}
      />

      {TYPER === "split" ? (
        <TyperInline
          currentLine={currentLine}
          finished={finished}
          lineInput={lineInput}
          lines={lines}
          onChangeLine={onChangeLine}
          quote={quote}
          wordStyle={wordStyle}
        />
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
