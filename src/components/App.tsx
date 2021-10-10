import React, { useState, useEffect } from "react"
import styled, { ThemeProvider, keyframes } from "styled-components"
import GlobalStyle from "./globalStyles"

import MemoryGame from "./MemoryGame"
import NoAllowed from "./NoAllowed"

// https://www.code-boost.com/react-memory-game/
// https://hp-api.herokuapp.com/ <- images

const AppWrapper = styled('div')`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`

const HeaderWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  font: normal 400 2rem/1 'Henny Penny', cursive;
`

const ButtonStyled = styled('button')`
  background-color: #ad2e10;
  color: #fff;
  border: .1em solid #c00;
  padding: .5rem .75rem;
  margin: 0 0 0 1rem;
  border-radius: .7rem;
  font: normal 400 1.35rem/1 'Henny Penny', cursive;
  text-transform: uppercase;
  cursor: pointer;
`
const FooterWrapper = styled('div')`
  opacity: .5;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  font: normal 400 1.25rem/1 'Henny Penny', cursive;
  border-top: .1rem solid #E8C39E;
`

function App() {
  const [deviceCompatible, setDeviceCompatible] = useState<boolean>(true)
  const [options, setOptions] = useState<number>(4)
  const [round, setRound] = useState<number>(1)
  const [score, setScore] = useState<number>(0)
  const [highScore, setHighScore] = useState<number>(0)

  const _checkResolution = () => {
    const wWidth = window.innerWidth
    setDeviceCompatible(wWidth < 960 ? false : true)
  }

  const newGame = () => {
    const newGame = window.confirm('Are you sure?')
    if (newGame) {
      setOptions(4)
      setRound(1)
    }
  }

  useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore')
    const savedScore = json ? JSON.parse(json) : null
    window.addEventListener('resize', _checkResolution);
    if (savedScore) setHighScore(savedScore)
  }, [])

  return (
    <AppWrapper>
      <GlobalStyle />
      {!deviceCompatible && <NoAllowed />}
      <HeaderWrapper>
        <h1>Hogwarts memory game</h1>
        <div>Round number: {round} | High Score: {highScore} <ButtonStyled onClick={newGame}>New Game</ButtonStyled></div>
      </HeaderWrapper>

      <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
          score={score}
          setScore={setScore}
          round={round}
          setRound={setRound}
        />
      
      <FooterWrapper><a href="https://www.albertofortes.com" title="Front-end React developer">Alberto Fortes</a>, 2021, a game to my son with ReactJS, TypeScript, Styled Components...</FooterWrapper>
    </AppWrapper>
  );
}

export default App;
