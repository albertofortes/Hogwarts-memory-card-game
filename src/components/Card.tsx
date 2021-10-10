import React, { FC, useState, useEffect } from "react"
import styled from "styled-components"

import cardBack from '../assets/card-shadow.png';
import cardFront from '../assets/card-front.png';

const StyledCard = styled('div')`
  position: relative;
  width: 18.6rem;
  height: 25.7rem;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  .wrapper__10-cards &,
  .wrapper__12-cards & {
    width: 14.5rem;
    height: 20rem;
  }

  .wrapper__14-cards & {
    width: 12.6rem;
    height: 17.4rem;
  }

  .wrapper__16-cards & {
    width: 11.1rem;
    height: 15.4rem;
  }

  .wrapper__18-cards & {
    width: 14.5rem;
    height: 20rem;
  }

  .wrapper__20-cards & {
    width: 11.1rem;
    height: 15.4rem;
  }

  .wrapper__24-cards & {
    width: 11.1rem;
    height: 15.4rem;
  }

  &.card--clicked {
    transform: rotateY(180deg);

    .card__side--back {
      transform: rotateY(180deg);
    }
  }

  .card__side {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    cursor: pointer;
    will-change: transform, opacity;
    transition: opacity .5s;
  }

  .card__side--front,
  .card__side--back {
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-image: url(${cardFront});
  }

  .card__side--back {
    &::after {
      content: '';
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background-image: url(${cardBack});
    }
  }
`

type Props = {
  id: number,
  poster: string,
  flippedCount: number,
  setFlippedCount: (flippedCount: number) => void,
  game: any[],
  flippedIndexes: any[],
  setFlippedIndexes: (any:[]) => void
}

const Card: FC<Props> = ({
  id,
  game,
  poster,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes
}) => {

  const [flipped, setFlipped] = useState(false)

  const cardFlipSoundUrl = require('../assets/card-slide.mp3')
  const cardFlipSoundAudio = new Audio(`./${cardFlipSoundUrl.default}`)

  /**
   * Flipped Indexes Changed
   * Under the first IF condition: if the third value in flippedIndexes is true we don’t have a match. 
   * Both conditions will add to the flippedCount and empty the flippedIndexes array. 
   * Since we used flippedCount % 3 earlier for our card click listener, the count will now be reset and another turn started.
   */
  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        setFlipped(!flipped)
        setFlippedIndexes([])
      }, 1000)
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedIndexes([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedIndexes, id, setFlippedIndexes])

  function onCardClick() {
    cardFlipSoundAudio.play();

    setFlipped(!flipped);
    setFlippedCount(flippedCount + 1);
    const newIndexes = [...flippedIndexes] as any;
    newIndexes.push(id);
    setFlippedIndexes(newIndexes);
    console.log(flippedCount);
  }

  return (
    <StyledCard onClick={onCardClick} className={flipped ? 'card--clicked' : ''}>
      <div
        className="card__side card__side--front" data-flipped={flipped}
        style={{opacity: flipped ? 0 : 1}}
      />
      <div
        className="card__side card__side--back" data-url={poster} data-flipped={flipped}
        style={{opacity: (flipped ? 1 : 0), backgroundImage: poster}}
      />
    </StyledCard>
  )
}

export default Card