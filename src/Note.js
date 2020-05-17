import React from 'react';
import './App.css';
import ProgressStepper from './Stepper'
import FirebaseContext from './assets/components/FireBase/FireBaseContext';

function Note() {
  return (
    <div>
      <FirebaseContext.Consumer>
        {firebase => <ProgressStepper firebase={firebase} className="stepper"/>}
      </FirebaseContext.Consumer>
    </div>
  );
}

export default Note;
