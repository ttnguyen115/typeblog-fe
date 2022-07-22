import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  input::placeholder {
    opacity: 0.5;
    font-size: 80%;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyles;
