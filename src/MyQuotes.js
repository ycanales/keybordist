import React, { useState } from "react";
import styled from "styled-components";
import StyledForm from "./StyledForm";
import { StyledListItem } from "./List";

const StyledQuote = styled(StyledListItem)`
  .quote-text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

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
            className="save"
            onClick={saveNewQuote}
            disabled={!newQuote.length || !newTitle.length}
          >
            Save
          </button>
        </form>

        <div className="list-right">
          {data && data.length ? (
            <React.Fragment>
              <h3>Your Quotes</h3>
              {data.map(quote => (
                <StyledQuote>
                  <div className="quote-row" key={quote.title}>
                    <p>{quote.title}</p>
                    <button
                      className="quote-delete"
                      onClick={e => deleteQuote(quote.title)}
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text quote-text">{quote.text}</p>
                </StyledQuote>
              ))}
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </StyledForm>
  );
};

export default MyQuotes;
