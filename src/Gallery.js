import React from 'react';
import './App.css';
import FirebaseContext from './assets/components/FireBase/FireBaseContext';
import LoadNotes from "./assets/components/LoadNotes.js";
import Footer from "./assets/components/Footer.js";
import PageTitleLayout from './assets/components/PageTitleLayout';
import StyledTypography from './assets/components/StyledTypography'
import { withStyles } from '@material-ui/core/styles';


const backgroundImage =
  '/images/gallery-background.jpg';


const styles = (theme) => ({
    background: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
        transition: 'all 1s ease',
      },
  h5: {
    marginBottom: theme.spacing(1 ),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  }
})

function Gallery(props){

const { classes } = props;

  const [loading, setLoading] = React.useState(false);

  return (
  <div>
    <PageTitleLayout  height="10vh" backgroundClassName={classes.background}>
    <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
    <StyledTypography color="inherit" align="center" variant="h2" marked="center">
          Note Gallery
    </StyledTypography>
      <StyledTypography className={classes.h5} color="inherit" align="center" variant="h5" marked="center">
        Write a note and watch it join the hundreds of other notes of encouragement from the community! 
      </StyledTypography>
    </PageTitleLayout>

  <FirebaseContext.Consumer>
      {firebase => <LoadNotes type="approved" offset={0} notesLimit={20} firebase={firebase}/>}
  </FirebaseContext.Consumer>
  <Footer/>
</div>
);

}

export default withStyles(styles)(Gallery)
