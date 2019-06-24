import React, { useState } from "react";
import styled from "styled-components";
import StyledForm from "./StyledForm";
import { StyledListItem } from "./List";
import uuid from "uuid/v1";

const StyledQuote = styled(StyledListItem)`
  .quote-text {
    
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

  const sortQuotes = event => {
    const sort = event.target.value;
    if (sort === "") {
      setQuotes(data);
      return;
    }

    const sorted = [...quotes];
    if (sort === "+length") {
      sorted.sort((a, b) => a.length - b.length);
    } else if (sort === "-length") {
      sorted.sort((a, b) => b.length - a.length);
    }
    setQuotes(sorted);
  };

  return (
    <StyledForm>
      <h2 className="message">Currently we have {data.length} quotes.</h2>

      <div className="row container allquotes-container">
        <div className="list-right">
          <div className="row allquotes-actions">
            <label className="search-label">Search</label>
            <input className="search-input" onChange={filterQuotes} />

            <label className="sort-label">Sort by</label>
            <select className="sort-select" onChange={sortQuotes}>
              <option value="" />
              <option value="+length">Shortest first</option>
              <option value="-length">Longest first</option>
            </select>
          </div>

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
