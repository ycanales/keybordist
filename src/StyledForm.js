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

  table {
    border: 4px dashed #3b4252;
  }

  th {
    text-align: left;
    padding: 8px 16px;
    border-bottom: 4px dashed #3b4252;
  }

  th:not(:first-child),
  td:not(:first-child) {
    border-left: 4px dashed #3b4252;
  }

  td {
    padding: 4px 16px;
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
  textarea,
  select {
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

  .allquotes-actions {
    align-items: center;
    margin-bottom: 2em;

    input,
    label,
    select {
      margin: 0;
      padding: 0;
    }

    .search-label,
    .sort-label {
      margin-right: 1em;
      flex-shrink: 0;
    }

    .search-input {
      margin-right: 1.5em;
      max-width: 40%;
      padding: 0.5em;
    }

    .search-input,
    .sort-select {
      height: 2em;
      font-size: 1em;
    }
  }
`;

export default StyledForm;
