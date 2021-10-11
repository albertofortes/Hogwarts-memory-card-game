import { createGlobalStyle } from 'styled-components'
import bodyBg from '../assets/bg.jpeg';
import cursorImg from '../assets/cursor.png';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Henny+Penny&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  
  body {
    line-height: 1;
    background-color: 8D4925;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  html { 
    font-size: 10px;
  }

  :root {
    font-size: 62.5%;
    body {
      font-size: 1.6rem;
    }
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
    background-color: #190000;
    color: #E8C39E;
    opacity: 0.6;
    
    &::before {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: .1;
      background: transparent url(${bodyBg}) center center no-repeat;
      background-size: cover;
    }

    &,
    a {
      cursor: url(${cursorImg}) , auto; 
    }
  }

  a {
    color: #E8C39E;
  }
`

export default GlobalStyle
