import React, { useState } from "react";
import styled from "styled-components";
import StyledForm from "./StyledForm";
import { StyledListItem } from "./List";
import uuid from "uuid/v1";

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
      set(data.concat([{ uuid: uuid(), title: newTitle, text: newQuote }]));
      setNewQuote("");
      setNewTitle("");
    }
  };

  const deleteQuote = uuid => {
    set(data.filter(quote => quote.uuid !== uuid));
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
                <StyledQuote key={quote.uuid}>
                  <div className="quote-row">
                    <p>{quote.title}</p>
                    <button onClick={e => deleteQuote(quote.uuid)}>
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
