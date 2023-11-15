import { createGlobalStyle } from "styled-components";
import "modern-normalize";

const GlobalStyle = createGlobalStyle`

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

html, body, h1, h2, h3, h4, p {
  margin: 0;
  padding: 0;
}

ul, ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

img {
  display: block;
  max-width: 100%;
  object-fit: cover;
}
`;

export default GlobalStyle;
