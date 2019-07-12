import React from 'react';
import './SettingsPage.css';
import { Link } from 'react-router-dom';

const SettingsPage = (props) => {
   function diffChange(diff) {
         props.handleDiffChange(diff);
         props.handleNewGame();
         props.history.push('/');
   }

   return ( 
      <div>
         <header className='header-footer'>Set Difficulty Level</header>
         <div className='diffsContainer'>
            <div className='diffContainer'>
               <button 
                  className='btn btn-default borton' 
                  disabled={props.difficulty === 'Easy'}
                  onClick={props.difficulty === 'Easy' ? null : () => diffChange('Easy')}
                  >Easy</button>
               {props.colors.Easy.map(color => 
                  <div 
                     className='SettingsPage'
                     key={color}
                     style={{backgroundColor: color}}
                  />
               )}
            </div>
            <div className='diffContainer'>
               <button 
                  className='btn btn-default borton'
                  disabled={props.difficulty === 'Moderate'}
                  onClick={props.difficulty === 'Moderate' ? null : () => diffChange('Moderate')}
               >Moderate</button>
               {props.colors.Moderate.map(color => 
                  <div 
                     className='SettingsPage'
                     key={color}
                     style={{backgroundColor: color}}
                  />
               )}
            </div>
            <div className='diffContainer'>
               <button 
                  className='btn btn-default borton'
                  disabled={props.difficulty === 'Difficult'}
                  onClick={props.difficulty === 'Difficult' ? null : () => diffChange('Difficult')}
               >Difficult</button>
               {props.colors.Difficult.map(color => 
                  <div 
                     className='SettingsPage'
                     key={color}
                     style={{backgroundColor: color}}
                  />
               )}
            </div>
         </div>
         <div className='cancel'>
            <Link className='btn btn-default' to="/">Cancel</Link>
         </div>
      </div>
      );
   }
   
   
   export default SettingsPage;
   // {Object.keys(props.colors).map(diff =>
         
   //       (<div className='diffContainer'>
   //          <button 
   //             className='btn btn-default borton' 
   //             disabled={props.difficulty === diff}
   //             onClick={props.difficulty === diff ? null : () => props.handleNewGame(props, diff)}
   //             >Easy</button>
   //          {props.colors.diff.map(color => 
   //             <div 
   //                className='SettingsPage'
   //                key={color}
   //                style={{backgroundColor: color}}
   //             />
   //          )}
   //       </div>)
   //    )}

