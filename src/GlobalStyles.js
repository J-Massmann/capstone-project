import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
    box-sizing: border-box;
    line-height: 1.5;
 }

 body {
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   background-color: var(--bg-color-main);
   color: var(--font-color);
   margin: 15px;
 }

 :root {
   --bg-color-main: #2A3036;
   --bg-color-action: #FF5A72;
   --bg-color-content: #bfc2c8; 
   --font-color: #F3F4F6;
 }
`;
