import React from 'react';
import styles from './ColorPicker.module.css';




const ColorPicker = (props) => {
   return ( 
      <div className={styles.ColorPicker}>
         {props.colors.map((color, idx) =>
            <button
               key={idx}
               className={styles.button}
               color={color}
               style={{
                  borderColor: color,
                  backgroundColor: idx === props.selColorIdx ? 'white' : color           
               }}
               onClick={() => props.colorSelect(idx)}
            />
            )}
      </div>
    );
}
 
export default ColorPicker;