import styled from "styled-components";

const StyledForm = styled.div`
  .row {
    display: flex;
  }
  .column {
    display: flex;
    flex-direction: column;
  }
  .container {
    flex: 1 0 50%;
    justify-content: space-between;
  }
  .list-right {
    flex: 1 0 50%;
    margin-left: 2rem;
    min-width: 0;
    h3 {
      margin-bottom: 1.5rem;
    }
  }
  form {
    flex: 1 0 50%;
  }
  .message {
    font-weight: 700;
    font-size: 50px;
    color: #eceff4;
    margin-bottom: 1em;
  }
  input,
  textarea {
    color: #eceff4;
    margin-top: 0.5em;
  }
  textarea {
    font-size: 16px;
  }
  label {
    display: block;
    margin-top: 1.5em;
    color: #d8dee9;
  }
  .save {
    margin-top: 42px;
    font-size: 28px;
  }

  .allquotes-container input {
    margin-bottom: 1em;
  }
`;

export default StyledForm;
