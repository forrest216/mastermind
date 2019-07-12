import React from 'react';
import GuessPegs from '../GuessPegs/GuessPegs';
import GuessScore from '../GuessScore/GuessScore';
import ScoreButton from '../ScoreButton/ScoreButton';
import styles from './GuessRow.module.css'

const GuessRow = (props) => (
   <div className={styles.GuessRow}>
      <div
         className={styles.rowNum}
         style={{color: props.currentGuess ? 'black' : 'lightgrey'}}
      >
         {props.rowIdx + 1}
      </div>
      <GuessPegs
         colors={props.colors}
         code={props.guess.code}
         currentGuess={props.currentGuess}
         handlePeg={props.handlePeg}
      />
      {
         props.currentGuess ?
         <ScoreButton 
            code={props.guess.code}
            submitGuess={props.submitGuess}
            rowIdx={props.rowIdx}
         /> :
         <GuessScore score={props.guess.score} />
      }
   </div>
)

// {
//    code: [null, null, null, null],
//    score: {
//      perfect: 0,
//      almost: 0
//    }
//  }
 
export default GuessRow;