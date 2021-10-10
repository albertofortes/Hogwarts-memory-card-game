import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"
import Card from "./Card"

interface ICards {
  options: number; 
};


const CardsWrapper = styled('div')<ICards>`
  display: grid;
  grid-template-columns: repeat(${props => props.options / 2}, 1fr);
  grid-gap: 1rem;
  grid-auto-rows: minmax(25.7rem, auto);
  margin: auto;

  &.wrapper__10-cards {
    grid-auto-rows: minmax(20rem, auto);
  }

  &.wrapper__12-cards {
    //grid-template-columns: repeat(${props => props.options / 3}, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }

  &.wrapper__14-cards {
    grid-template-columns: repeat(${props => props.options / 2}, 1fr);
    grid-auto-rows: minmax(17.4rem, auto);
  }

  &.wrapper__16-cards {
    grid-template-columns: repeat(${props => props.options / 4}, 1fr);
    grid-auto-rows: minmax(15.4rem, auto);
  }

  &.wrapper__18-cards {
    grid-template-columns: repeat(${props => props.options / 3}, 1fr);
    grid-auto-rows: minmax(20rem, auto);
  }

  &.wrapper__20-cards {
    grid-template-columns: repeat(${props => props.options / 4}, 1fr);
    grid-auto-rows: minmax(15.4rem, auto);
  }

  &.wrapper__24-cards {
    grid-template-columns: repeat(${props => props.options / 4}, 1fr);
    grid-auto-rows: minmax(12rem, auto);
  }
`

const SingleCard = styled('div')`
  width: 100%;
  height: 100%;
  perspective: 1000px;
 `

type Props = {
  options: number,
  setOptions: (options: number) => void,
  highScore: number,
  setHighScore: (highScore: number) => void,
  score: number,
  setScore: (score: number) => void,
  round: number,
  setRound: (round: number) => void
}

const MemoryGame: FC<Props> = ({
  options, 
  setOptions, 
  highScore, 
  setHighScore,
  score, 
  setScore,
  round,
  setRound
}) => {
  const [game, setGame] = useState([] as any)
  const [posters, setPosters] = useState([] as any)
  const [flippedCount, setFlippedCount] = useState<number>(1)
  const [flippedIndexes, setFlippedIndexes] = useState([] as any)

  const cardMatchesSoundUrl = require('../assets/magic-sweep-game-trophy.wav')
  const cardMatchesSoundAudio = new Audio(`./${cardMatchesSoundUrl.default}`)

  const getPosters = async () => {
    const response = await fetch(`https://hp-api.herokuapp.com/api/characters`)
    const json = await response.json()
    //setPosters(json.children.map(it => it.data))
    setPosters(json)
  };

  useEffect(() => {
    getPosters()
  }, [])

  useEffect(() => {
    const newGame:any = []
    
    setGame([])    
    for (let i = 0; i < options / 2; i++) {
      const theImg = posters.length > 0 && posters[i]['image']
      const firstOption = {
        id: 2 * i,
        cardId: i,
        poster: `url(${theImg})`,
        flipped: false,
      }
      const secondOption = {
        id: 2 * i + 1,
        cardId: i,
        poster: `url(${theImg})`,
        flipped: false,
      }
      newGame.push(firstOption)
      newGame.push(secondOption)
    }

    const shuffledGame:any = newGame.sort(() => Math.random() - 0.5)
    setGame(shuffledGame)
  }, [options, posters])

  /**
   * Finish a round
   * Loads when the game variable changes
   * High Score: Since we have a flippedCount variable we can keep track of the users score based on how many attempts they made.
   */
  useEffect(() => {
    const finished = !game.some((card:any) => !card.flipped) as boolean

    if (finished && game.length > 0) {
      setTimeout(() => {
        setScore(options * 2 - flippedCount)

        if (score > highScore) {
          setHighScore(score)
          const json = JSON.stringify(score)
          localStorage.setItem('memorygamehighscore', json)
        }

        setOptions(0)
        setFlippedCount(0)
        setTimeout(() => {
          setRound(round + 1)
          setOptions(game.length === 24 ? game.length : (game.length === 20 ? game.length + 4 : game.length + 2))
        }, 5)
      }, 500)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  /**
   * Runs if two cards have been flipped
   * When two cards are flipped they will either be a match or not, and we can check for that. First we set a boolean variable match to check whether the indexes of the cards we flipped have the same cardId in the game board. The cardId is an index 0, 1, 2
   * If the match is made and the cardIds of each card are the same, we clone the game board to update the flipped values of those cards in the game array. Once the newGame variable is ready, we update the game and set the third flippedIndexes value to be false, preventing a flip reset.
   * If the match wasn’t made, we instead leave the game board alone and add true to the flippedIndexes array, triggering a flip reset.
   * Lastly, for our match logic we need to fill out the useEffect hook we setup earlier in the Card component. Replace this hook now with the following
   */
  if (flippedIndexes.length === 2) {
    const match = game[flippedIndexes[0]].cardId === game[flippedIndexes[1]].cardId

    if (match) {
      const newIndexes = [...flippedIndexes] as any
      const newGame = [...game] as any
      newGame[flippedIndexes[0]].flipped = true
      newGame[flippedIndexes[1]].flipped = true
      setGame(newGame)      
      newIndexes.push(false)
      setFlippedIndexes(newIndexes)

      cardMatchesSoundAudio.play()
    } else {
      const newIndexes = [...flippedIndexes] as any
      newIndexes.push(true)
      setFlippedIndexes(newIndexes)
    }
  }

  if (game.length === 0) return <div>loading...</div>
  else {
    return (
      <CardsWrapper options={options} className={`wrapper__${options}-cards`}>
        {game.map((card:any, index:number) => (
          <SingleCard key={index}>
            <Card
              id={index}
              poster={card.poster}
              game={game}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              flippedIndexes={flippedIndexes}
              setFlippedIndexes={setFlippedIndexes}
            />
          </SingleCard>
        ))}
      </CardsWrapper>
    )
  }

}

export default MemoryGame
