import React from "react";
import { Link } from "react-router-dom";

import { getDisplayText } from "./MySetups";

const TyperHeader = ({
  started,
  finished,
  currentSetup,
  setupsCount,
  reset,
  time,
  wpm
}) => {
  return (
    <>
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
      {started && !finished && (
        <h2>
          Happy typing. <button onClick={reset}>Abort?</button>
        </h2>
      )}
    </>
  );
};

export default TyperHeader;
