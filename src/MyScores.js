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
        <ul>
          {data.map(score => (
            <li key={score.uuid}>
              <UncommonSpan>
                {getDisplayText(
                  setups.find(setup => setup.uuid === score.setupUuid),
                  true
                )}
              </UncommonSpan>
              {new Date(score.date).toLocaleDateString()} - {score.wpmString}{" "}
              WPM - {score.words} words in {score.time} seconds.
            </li>
          ))}
        </ul>
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
