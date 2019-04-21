import React, { useState } from "react";
import styled from "styled-components";

const StyledMyQuotes = styled.div`
  form {
    width: 50%;
  }
  .message {
    margin-bottom: 1em;
  }
  input,
  textarea {
    margin-top: 0.5em;
  }
  label {
    display: block;
    margin-top: 1.5em;
  }
  button {
    margin-top: 1em;
  }
`;

const MyQuotes = ({ data, set }) => {
  const [newQuote, setNewQuote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const saveNewQuote = () => {
    if (newQuote.length && newTitle.length) {
      set(data.concat([{ title: newTitle, text: newQuote }]));
    }
  };
  return (
    <StyledMyQuotes>
      {(!data || !data.length) && (
        <p className="message">You have no quotes, why don't you paste one?</p>
      )}
      {data && data.length && data.map(quote => <p>{quote.title}</p>)}

      <form onSubmit={saveNewQuote}>
        <label>Title</label>
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
        <label>Text</label>
        <textarea
          value={newQuote}
          onChange={e => setNewQuote(e.target.value)}
        />
        <button
          onClick={saveNewQuote}
          disabled={!newQuote.length || !newTitle.length}
        >
          Save
        </button>
      </form>
    </StyledMyQuotes>
  );
};

export default MyQuotes;
