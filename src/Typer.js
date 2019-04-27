import React from "react";
import styled from "styled-components";
import { inputs } from "./styles";

const StyledTyper = styled.div`
  h2 {
    padding-left: 21px;
    font-weight: 700;
    font-size: 50px;
  }
  .quote {
    border: 4px dashed #3b4252;
    font-size: 27px;
    position: relative;

    p {
      margin: 0;
      padding: 21px;
    }
  }
  textarea {
    font-size: 27px;
    padding: 21px;
  }
`;

const Typer = ({
  started,
  finished,
  time,
  wpm,
  reset,
  quote,
  okInput,
  onChange,
  input,
  errInput,
  records
}) => {
  return (
    <StyledTyper>
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

      {records.length > 0 && (
        <ul>
          {records.map(r => (
            <li>
              {r.wpmString} WPM - {r.words} words in {r.time} seconds.
            </li>
          ))}
        </ul>
      )}
    </StyledTyper>
  );
};

export default Typer;
