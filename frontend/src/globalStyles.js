import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle
  `
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background-color: white;
  }
  .ql-editor {
    height: 400px;
  }
`;

export default GlobalStyle;