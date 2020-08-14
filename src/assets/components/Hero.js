import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import StyledTypography from './StyledTypography'
import ProductHeroLayout from './ProductHeroLayout';
import HomeStatWidget from './HomeStatWidget.js';
import FirebaseContext from './FireBase/FireBaseContext';
import Container from '@material-ui/core/Container';
import lottie from 'lottie-web'


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
      fontSize: '3rem'
    },
  },
  h2: {
    margin: theme.spacing(2,4,2,4),
    fontSize: '1.3rem',
    color: "#606060",
    fontWeight: 'light',
    maxWidth: '450px',
    // [theme.breakpoints.up('md')]: {
    //   margin: theme.spacing(4, 4, 4, 12),
    // },
  },

  button:{
    margin: theme.spacing(2,2,2,4),
    // [theme.breakpoints.up('md')]: {
    //   margin: theme.spacing(0, 0, 12, 12),
    // },
  },
  animation:{
    margin: theme.spacing(2,4,4,4),
  }
}));

function ProductHero(props) {

  const container = React.useRef(null);

  function handleClick() {
    props.parentCallback()
  }
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
        direction="row-reverse"
        justify="center"
        alignItems="center"
        >
           <Grid item xs={12} md={4} lg={3}>
          {/* Animation Goes Here */}
          <div className={classes.animation} ref={container}/>
        </Grid>
        <Grid item xs={12} md={7} lg={5}> 
          <div>
            <Typography className={classes.h1} align='left' variant='h1'>
              Show frontline workers that we care
            </Typography>
            <Typography className={classes.h2} align='left' variant='h1'>
              Join the movement supporting the mental health of our frontline workers, one note at a time.
            </Typography>
            <Button
            color="secondary"
            variant="contained"
            size="large"
            className={classes.button}
            component="a"
            onClick={handleClick}
          >
            Write a Note
            </Button>
            </div>
        </Grid>
        
     
        <Grid item xs={12} md={11} lg={8}>
          <FirebaseContext.Consumer >
            {firebase => (<HomeStatWidget firebase={firebase}/>)}
          </FirebaseContext.Consumer>
        </Grid>

      </Grid>
    </div>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ProductHero;