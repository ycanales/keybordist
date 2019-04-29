import React from "react";
import StyledForm from "./StyledForm";

const MyScores = ({ data, ...rest }) => {
  console.log(data);
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
