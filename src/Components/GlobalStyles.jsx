import { createGlobalStyle } from "styled-components";
import "modern-normalize";

const GlobalStyle = createGlobalStyle`

:root {
  color-scheme: light dark;
  color: rgba(32, 34, 34, 0.87);
  background-color: #758f8baa;
}

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

  /* Override autofill styles for text inputs */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill::first-line {
    -webkit-text-fill-color: #000; /* Change text color to black */
    transition: background-color 5000s ease-in-out 0s; /* Delay background transition */
  }

  /* Target autofill placeholders specifically */
  input::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.7;
  }


`;

export default GlobalStyle;
