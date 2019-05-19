import React from "react";

const TyperClassic = ({
  errInput,
  finished,
  input,
  okInput,
  onComplete,
  quote,
  setErrInput,
  setInput,
  setMenuVisibility,
  setOkInput,
  setStarted,
  started
}) => {
  const onChange = event => {
    const text = event.target.value;
    setInput(text);

    // Text complete
    if (text === quote.text) {
      onComplete();
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
    <>
      <div className="quote">
        <p>{quote.text}</p>
        <p className="progress">{okInput}</p>
      </div>
      <p className="quote-citation">&mdash;{quote.title}</p>
      <textarea
        value={input}
        onChange={onChange}
        onFocus={() => {
          setMenuVisibility(false);
          window.scrollTo(0, 0);
        }}
        onBlur={() => setMenuVisibility(true)}
        rows="10"
        disabled={finished}
        style={errInput ? { color: "#B48EAD" } : {}}
      />
    </>
  );
};

export default TyperClassic;
