import React from "react";

const TyperInline = ({
  currentLine,
  finished,
  lineInput,
  lines,
  onChangeLine,
  quote,
  wordStyle
}) => {
  return (
    <>
      <div className="quote quote--split">
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            <p className={i === currentLine ? "quote--active-line" : ""}>
              {line.split(" ").map((word, k) => (
                <span key={k} className={wordStyle(i, k)}>
                  {word}{" "}
                </span>
              ))}
            </p>
            {i === currentLine && !finished ? (
              <input
                autoFocus
                className="line-input"
                onChange={onChangeLine}
                value={lineInput}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
      <p className="quote-citation">&mdash;{quote.title}</p>
    </>
  );
};

export default TyperInline;
