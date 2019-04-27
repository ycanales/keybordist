import React, { useState } from "react";
import StyledForm from "./StyledForm";

const MyQuotes = ({ data, set }) => {
  const [newQuote, setNewQuote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const saveNewQuote = e => {
    e.preventDefault();
    if (data && newQuote.length && newTitle.length) {
      set(data.concat([{ title: newTitle, text: newQuote }]));
      setNewQuote("");
      setNewTitle("");
    }
  };
  const deleteQuote = title => {
    set(data.filter(quote => quote.title !== title));
    setNewQuote("");
    setNewTitle("");
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

      <div className="row container">
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
            class="save"
            onClick={saveNewQuote}
            disabled={!newQuote.length || !newTitle.length}
          >
            Save
          </button>
        </form>

        <div class="list-right">
          {data && data.length ? (
            <React.Fragment>
              <h3>Your Quotes</h3>
              {data.map(quote => (
                <div className="row quote-row" key={quote.title}>
                  <p>{quote.title}</p>
                  <button onClick={e => deleteQuote(quote.title)}>
                    Delete
                  </button>
                </div>
              ))}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </StyledForm>
  );
};

export default MyQuotes;
