import React from "react"
import styled from "styled-components"

const NoAllowedWrapper = styled('div')`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  background: #000;

  h2 {
    font: normal 700 2.7rem/1.5 Arial, Helvetica, sans-serif;
    margin: 0 0 .5em;
  }
`

const NoAllowed = () => (
  <NoAllowedWrapper>
    <h2>Device not allowed</h2>
    <p>The minimum resolution allowed to play is 960*640px</p>
  </NoAllowedWrapper>
)

export default NoAllowed