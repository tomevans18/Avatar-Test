/* eslint-disable camelcase */
import { css } from 'styled-components';
import { rgba } from 'polished';
import theme from './theme';
import responsiveType from './lib/responsiveType';
import { multiply } from './lib/calculate';

const {
  color: { black, white },
  component: { spacing },
} = theme;

export default css`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  html {
    font: normal 100% / 1.65 serif;
  }

  body {
    hyphens: auto;
    word-wrap: break-word;
    line-height: 1.3;
    color: ${black};
  }

  #__next {
    display: flex;
    min-height: 100vh;
  }

  div,
  section,
  article,
  aside,
  main {
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      margin-top: 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-rendering: optimizeLegibility;
    line-height: 1;
    font-weight: bold;
    margin-top: ${multiply(spacing, 0.5)};
  }

  h1 {
    ${responsiveType('5.5vw', '3em', '3.8em', '3.8em')};
    margin-bottom: 2.42424rem;
    font-size: 2.625em;
  }

  h2 {
    ${responsiveType('5vw', '2.6em', '3.33333em', '3.33333em')};
    margin-bottom: 2.0202rem;
    font-size: 1.875em;
  }

  h3 {
    ${responsiveType('4vw', '2.2em', '2.66667em', '2.66667em')};
    margin-bottom: 1.61616rem;
    font-size: 1.5em;
  }

  h4 {
    ${responsiveType('2.7vw', '1.5em', '1.8em', '1.8em')};
    margin-bottom: 1.21212rem;
    font-size: 1.3125em;
  }

  h5 {
    ${responsiveType('2.25vw', '1.3em', '1.5em', '1.5em')};
    margin-bottom: 0.80808rem;
  }

  h6 {
    ${responsiveType('2.05vw', '1.1em', '1.3em', '1.3em')};
    margin-bottom: 0.60606rem;
  }

  p {
    line-height: 1.5;
    font-size: 1em;
    a {
      color: ${black};
    }
  }

  p,
  ul,
  ol,
  dl,
  pre {
    line-height: 1.5;
    margin-bottom: ${multiply(spacing, 0.5)};
  }

  small {
    font-size: 80%;
    line-height: 1.1;
  }

  a {
    color: ${black};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  strong,
  b {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.5em;
  }

  img {
    width: auto;
    max-width: 100%;
    height: auto;
  }

  ul {
    list-style-type: disc;

    ul {
      margin: 0;
    }

    ul > li {
      margin-left: 1.5rem;
    }
  }

  ul,
  ol,
  dl {
    margin-left: 2.5rem;
    font-size: 1em;
    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ul ul,
  ol ul {
    list-style-type: circle;
  }

  ol ol ul,
  ol ul ul,
  ul ol ul,
  ul ul ul {
    list-style-type: square;
  }

  ol {
    list-style-type: decimal;
  }

  dl {
    margin-left: 0;
    dt {
      font-weight: bold;
      margin-top: ${multiply(spacing, 0.5)};

      &:first-child {
        margin-top: 0;
      }
    }
  }

  body {
    font-family: 'Open Sans', 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-display: auto;
    line-height: 1.25;
  }

  hr {
    border: 0;
    height: 0;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    margin: 0 0 ${spacing} 0;
  }

  blockquote {
    position: relative;
    padding: 0.75rem 1.5rem 0.75rem 1rem;
    font-size: 1.25rem;
    border-left: 0.5rem solid ${black};
    margin: 0 0 ${spacing};

    &::before {
      content: '"';
      position: absolute;
      top: 1.45rem;
      left: 0.5rem;
      color: ${black};
      font-size: 4rem;
      line-height: 0.1rem;
      margin-right: 0;
      vertical-align: -0.4rem;
    }

    & p {
      display: inline-block;

      &:first-child {
        text-indent: 1.75rem;
      }

      &:last-child {
        margin: 0 0 0.5rem;
      }
    }
  }

  pre {
    position: relative;
    background: ${black};
    border: 1px solid ${black};
    border-left: 3px solid ${black};
    color: ${black};
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 1em;
    line-height: 1.6;
    max-width: 100%;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;

    code {
      border: none;
      padding: 0;
      font-size: inherit;
      white-space: pre-wrap;
      background-color: transparent;
      color: ${black};
    }
  }

  code {
    background: ${black};
    border: 1px solid ${black};
    padding: 0.1em 0.5em 0.2em;
    color: ${black};
    font-family: monospace;

    &::selection {
      background: #b3d4fc;
    }
  }

  mark {
    color: inherit;
    background: ${rgba(black, 0.5)};
    padding: 0 0.2em;
  }

  abbr {
    position: relative;
    &:hover {
      &::after {
        content: attr(title);
        position: absolute;
        white-space: nowrap;
        padding: 0.25rem 0.5rem;
        background: ${white};
        font-size: 0.75rem;
        border: 1px solid ${black};
        box-shadow: 4px 4px 20px -10px ${rgba(black, 0.75)};
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(-100% - 0.25rem));
      }
    }
  }
`;
