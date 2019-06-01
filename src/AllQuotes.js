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

const AllQuotes = ({ data, set, setQuote, history, ...rest }) => {
  const [currentQuote, setCurrentQuote] = useState("");
  const [quotes, setQuotes] = useState(data);

  const filterQuotes = event => {
    const query = event.target.value.toLowerCase();
    if (query === "") {
      setQuotes(data);
    } else {
      const titleMatches = data.filter(
        q => q.title.toLowerCase().indexOf(query) !== -1
      );
      const titleMatchesIds = titleMatches.map(q => q.guid);
      const textMatches = data.filter(
        q =>
          q.text.toLowerCase().indexOf(query) !== -1 &&
          titleMatchesIds.indexOf(q.guid) === -1
      );
      setQuotes(titleMatches.concat(textMatches));
    }
  };

  return (
    <StyledForm>
      <h2 className="message">Currently we have {data.length} quotes.</h2>

      <div className="row container allquotes-container">
        <div className="list-right">
          <label>Search</label>
          <input onChange={filterQuotes} />

          {quotes.map(quote => (
            <StyledQuote key={quote.uuid}>
              <div className="quote-row">
                <p>{quote.title}</p>
                <div className="row setup-row-actions">
                  <button
                    className="select"
                    onClick={e => {
                      setQuote(quote);
                      history.push("/");
                    }}
                  >
                    Play
                  </button>
                </div>
              </div>
              <p className="text quote-text">{quote.text}</p>
            </StyledQuote>
          ))}
        </div>
      </div>
    </StyledForm>
  );
};

export default AllQuotes;
