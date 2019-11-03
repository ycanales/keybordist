import React, { useState } from "react";
import StyledForm from "./StyledForm";
import { getDisplayText } from "./MySetups";
import { UncommonSpan } from "./nord";

const DATE_ASCENDING = "+date";
const DATE_DESCENDING = "-date";

const MyScores = ({ data, setups, ...rest }) => {
  if (data && data.length) {
    const [sortedData, setSortedData] = useState([...data]);
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

    return (
      <StyledForm>
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
              <th>WPM</th>
              <th></th>
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
                <td>
                  {score.words} words in {score.time} seconds
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
