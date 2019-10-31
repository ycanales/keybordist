import React from "react";
import StyledForm from "./StyledForm";
import { getDisplayText } from "./MySetups";
import { UncommonSpan } from "./nord";

const MyScores = ({ data, setups, ...rest }) => {
  if (data && data.length) {
    return (
      <StyledForm>
        {data.length === 1 ? (
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
              <th>Date</th>
              <th>Setup</th>
              <th>WPM</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(score => (
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
