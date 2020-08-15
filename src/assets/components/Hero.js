import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import StyledTypography from './StyledTypography'
import ProductHeroLayout from './ProductHeroLayout';
import Hidden from '@material-ui/core/Hidden';
import HomeStatWidget from './HomeStatWidget.js';
import FirebaseContext from './FireBase/FireBaseContext';
import Container from '@material-ui/core/Container';
import lottie from 'lottie-web'
import { Link as RouterLink } from 'react-router-dom';
import HomeStatWidgetMini from './HomeStatWidgetMini';

const useStyles = makeStyles((theme) => ({
  container:{
    backgroundColor: theme.palette.primary.light
  },
  h1: {
    margin: theme.spacing(2,4,2,4),
    fontSize: '3.5rem',
    fontWeight: 'bold',
    maxWidth: '600px',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.2rem',
      margin: theme.spacing(6,2,2,2),
    },
  },
  h2: {
    margin: theme.spacing(2,4,2,4),
    fontSize: '1.3rem',
    color: "#606060",
    fontWeight: 'light',
    maxWidth: '450px',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.1rem',
      margin: theme.spacing(2,2,0,2),
    },
  },

  button:{
    margin: theme.spacing(2,2,2,4),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(2),
    },
  },
  animation:{
    margin: theme.spacing(2,4,4,4),
    [theme.breakpoints.down('md')]: {
      margin: "0px",
    },
  }
}));



function ProductHero(props) {

  function noteButton(){
    return(
      <Button
      color="secondary"
      variant="contained"
      size="large"
      className={classes.button}
      component={RouterLink} to="/note"
      >
        Write a Note
      </Button>
    )
  }

  const container = React.useRef(null);

  // function handleClick() {
  //   props.parentCallback()
  // }
  const classes = useStyles();

  React.useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData:require('../animations/animation-svg.json')
    })
  }, [])

  return (
    <div className={classes.container}>
      <Grid container 
        direction="row"
        justify="center"
        alignItems="center"
        >
         <Grid item xs={12} md={7} lg={5}> 
          <div>
            <Typography className={classes.h1} align='left' variant='h1'>
              Show frontline workers that we care
            </Typography>
            <Typography className={classes.h2} align='left' variant='h1'>
              Join the movement supporting the mental health of our frontline workers, one note at a time.
            </Typography>
            <Hidden only={['sm', 'xs']}>
              {noteButton()}
            </Hidden>
            </div>
        </Grid>

        <Grid item xs={10} md={4} lg={3}>
          {/* Animation Goes Here */}
          <div className={classes.animation} ref={container}/>
        </Grid>
        <Hidden only={['md', 'lg', 'xl']}>
              {noteButton()}
        </Hidden>
        
        <Hidden only={['sm', 'xs']}>
          <Grid item xs={12} md={11} lg={8}>
            <FirebaseContext.Consumer >
              {firebase => (<HomeStatWidget firebase={firebase}/>)}
            </FirebaseContext.Consumer>
          </Grid>
        </Hidden>

        <Hidden only={['md', 'lg', 'xl']}>
        <Grid item xs={12} md={11} lg={8}>
            <FirebaseContext.Consumer >
              {firebase => (<HomeStatWidgetMini firebase={firebase}/>)}
            </FirebaseContext.Consumer>
          </Grid>
        </Hidden>

      </Grid>
    </div>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ProductHero;