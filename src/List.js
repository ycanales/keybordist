import React from "react";
import styled from "styled-components";
import nord from "./nord";

export const StyledListItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  .quote-row,
  .setup-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    font-size: 1rem;
  }
  .text {
    font-size: 1rem;
  }
  .ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 1rem;
  }
  button {
    text-decoration: none;

    &:hover:enabled {
      cursor: pointer;
    }
  }
  .select {
    margin-right: 12px;
  }
  .delete {
    color: ${nord[12]};
    border-bottom: 2px solid ${nord[12]};
    &:hover:enabled {
      color: ${nord[11]};
      border-bottom: 2px solid ${nord[11]};
    }
  }
`;
