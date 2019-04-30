import styled from "styled-components";

export default {
  /* Polar Night */
  0: "#2E3440", // Dark: background. Bright: plain text.
  1: "#3B4252", // Dark: prominent UI elements. Bright: subtle text.
  2: "#434C5E",
  3: "#4C566A",

  /* Snow Storm */
  // Bright to dark: 6 as base, highlights with 5 and 4. (recommended)
  // Dark to bright: 4 as base, highlights with 5 and 6.
  4: "#D8DEE9",
  5: "#E5E9F0",
  6: "#ECEFF4",

  /* Frost */
  7: "#8FBCBB", // UI elements that should stand out, next to 8.
  8: "#88C0D0", // Primary accent color.
  9: "#81A1C1", // Secondary UI elements.
  10: "#5E81AC", // Tertiary UI elements.

  /* Aurora */
  11: "#BF616A", // Error states.
  12: "#D08770", // Advanced or dangerous functionality.
  13: "#EBCB8B", // Warning states.
  14: "#A3BE8C", // Success.
  15: "#B48EAD" // Uncommon functionality.
};

export const UncommonSpan = styled.span`
  color: #b48ead;
`;
