import React from 'react';
import './App.css';
import ProgressStepper from './Stepper'
import FirebaseContext from './assets/components/FireBase/FireBaseContext';
import Helmet from 'react-helmet'




function Note() {

  return (
    <div >
      <Helmet>
        <title>
          Write a Note!
          </title>
        <meta name="description" content="It's quick, easy, and impactful! Simply choose a frontliner, a location, and write a note. We'll handle the delivery!" />
      </Helmet>
      <FirebaseContext.Consumer>
        {firebase => <ProgressStepper firebase={firebase} className="stepper" />}
      </FirebaseContext.Consumer>
    </div>
  );
}

export default Note;
