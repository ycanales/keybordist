import React, { useState } from "react";
import Shiitake from "shiitake";
import humanizeDuration from "humanize-duration";
import styled from "styled-components";

import StyledForm from "./StyledForm";
import { getDisplayText } from "./MySetups";
import quotes from "./data/quotes";
import { default as nord, UncommonSpan } from "./nord";

const DATE_ASCENDING = "+date";
const DATE_DESCENDING = "-date";
const WPM_ASCENDING = "+wpm";
const WPM_DESCENDING = "-wpm";

const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: "shortEn",
  languages: {
    shortEn: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms"
    }
  }
});

const StyledScores = styled.div`
  font-size: 16px;
  .time-cell {
    min-width: 120px;
  }
  .words-cell {
    min-width: 140px;
  }
  .quote-title {
    color: ${nord[13]};
  }
  .quote-text {
    font-size: 12px;
  }
`;

const MyScores = ({ data, setups, ...rest }) => {
  if (data && data.length) {
    const [sortedData, setSortedData] = useState([
      ...data.map(score => {
        return {
          ...score,
          quote: quotes.find(q => q.uuid === score.quoteUuid)
        };
      })
    ]);
    const [currentSort, setCurrentSort] = useState(DATE_DESCENDING);

    const sortByDate = () => {
      if (currentSort === DATE_DESCENDING) {
        setSortedData(
          [...sortedData].sort((a, b) => (a.date < b.date ? -1 : 1))
        );
        setCurrentSort(DATE_ASCENDING);
      } else {
        setSortedData(
          [...sortedData].sort((a, b) => (a.date > b.date ? -1 : 1))
        );
        setCurrentSort(DATE_DESCENDING);
      }
    };

    const sortByWPM = () => {
      if (currentSort === WPM_DESCENDING) {
        setSortedData(
          [...sortedData].sort((a, b) => (a.wpmRaw > b.wpmRaw ? -1 : 1))
        );
        setCurrentSort(WPM_ASCENDING);
      } else {
        setSortedData(
          [...sortedData].sort((a, b) => (a.wpmRaw < b.wpmRaw ? -1 : 1))
        );
        setCurrentSort(WPM_DESCENDING);
      }
    };

    return (
      <StyledForm>
        <StyledScores>
          {sortedData.length === 1 ? (
            <h2 className="message">You have typed one quote.</h2>
          ) : (
            <h2 className="message">You have played {data.length} times.</h2>
          )}

          <div className="row allquotes-actions">
            <label className="search-label">Search</label>
            <input className="search-input" />
          </div>

          <table>
            <thead>
              <tr>
                <th>
                  <button onClick={sortByDate}>Date</button>
                </th>
                <th>Setup</th>
                <th>
                  <button onClick={sortByWPM}>WPM</button>
                </th>
                <th>Time</th>
                <th>Words #</th>
                <th>Quote</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(score => (
                <tr key={score.uuid}>
                  <td>{new Date(score.date).toLocaleDateString()}</td>
                  <td>
                    {getDisplayText(
                      setups.find(setup => setup.uuid === score.setupUuid)
                    )}
                  </td>
                  <td>{score.wpmString}</td>
                  <td className="time-cell">
                    {shortEnglishHumanizer(score.time * 1000)}
                  </td>
                  <td className="words-cell">{score.words} words</td>

                  <td>
                    {score.quote ? (
                      <React.Fragment>
                        <span class="quote-title">{score.quote.title}</span>
                        <Shiitake lines={2} className="quote-text">
                          {score.quote.text}
                        </Shiitake>
                      </React.Fragment>
                    ) : (
                      "Quote wasn't stored for this score because it's from an older Keybordist version, sorry."
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledScores>
      </StyledForm>
    );
  }
  return (
    <StyledForm>
      <h2 className="message">You haven't played yet.</h2>
    </StyledForm>
  );
};

export default MyScores;
