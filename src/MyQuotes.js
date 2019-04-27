import React, { useState } from "react";
import StyledForm from "./StyledForm";

const MyQuotes = ({ data, set }) => {
  const [newQuote, setNewQuote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const saveNewQuote = e => {
    e.preventDefault();
    if (data && newQuote.length && newTitle.length) {
      setNewQuote("");
      setNewTitle("");
      set(data.concat([{ title: newTitle, text: newQuote }]));
    }
  };
  return (
    <StyledForm>
      {!data || !data.length ? (
        <h2 className="message">You have no quotes.</h2>
      ) : data.length === 1 ? (
        <h2 className="message">You have one quote.</h2>
      ) : (
        <h2 className="message">You have {data.length} quotes.</h2>
      )}

      <div className="row">
        <form onSubmit={saveNewQuote}>
          <h3>New Quote</h3>
          <label>Title</label>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <label>Text</label>
          <textarea
            value={newQuote}
            onChange={e => setNewQuote(e.target.value)}
            rows={5}
          />
          <button
            onClick={saveNewQuote}
            disabled={!newQuote.length || !newTitle.length}
          >
            Save
          </button>
        </form>

        <div>
          {data && data.length ? (
            <React.Fragment>
              <h3>Your Quotes</h3>
              {data.map(quote => (
                <p key={quote.title}>{quote.title}</p>
              ))}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </StyledForm>
  );
};

export default MyQuotes;
