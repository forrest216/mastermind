import React from 'react';
import styles from './ScoreButton.module.css';

const ScoreButton = (props) => (
  <div>
    {props.code.includes(null) ?
    <button 
    className={`${styles.button} btn btn-default`}
    disabled
  > ✔ </button>
    :
    <button 
      className={`${styles.button} btn btn-default`}
      onClick={() => props.submitGuess(props.rowIdx)}
    > ✔ </button>
    }
  </div>
);

export default ScoreButton;