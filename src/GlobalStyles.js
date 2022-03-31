import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
    box-sizing: border-box;
 }
 
 :root {
   --bg-color-main: #2A3036;
   --bg-color-action: #FF5A72;
   --bg-color-content: #bfc2c8;
   --font-color: #F3F4F6;
 }

 body {
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   line-height: 1.5;
   background-color: var(--bg-color-main);
   color: var(--font-color);
   margin: 0 15px;
 }
`;
