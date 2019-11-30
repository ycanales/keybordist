import React from "react";
import styled from "styled-components";
import StyledForm from "./StyledForm";

const StyledChangelog = styled.div`
  h4 {
    margin-top: 14px;
  }

  li {
    margin-left: 32px;
  }
`;

const ChangeLog = () => (
  <StyledForm>
    <StyledChangelog>
      <h2 className="message">Changelog</h2>

      <h3>v2019.11.30</h3>

      <h4>Added</h4>
      <ul>
        <li>Changelog section.</li>
        <li>New logo.</li>
      </ul>

      <h4>Changed</h4>
      <ul>
        <li>Layout is now centered.</li>
        <li>Navigation links are now smaller and right aligned.</li>
        <li>Improved "My Scores".</li>
      </ul>
    </StyledChangelog>
  </StyledForm>
);

export default ChangeLog;
