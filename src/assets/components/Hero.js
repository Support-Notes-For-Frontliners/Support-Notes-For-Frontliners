import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import StyledTypography from './StyledTypography'
import ProductHeroLayout from './ProductHeroLayout';
import HomeStatWidget from './HomeStatWidget.js';
import FirebaseContext from './FireBase/FireBaseContext';




const backgroundImage =
  '/images/hero_background.jpg';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
    marginTop: theme.spacing(6)
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

function ProductHero(props) {

  function handleClick() {
    props.parentCallback()
  }

  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
      <StyledTypography color="inherit" align="center" variant="h2" marked="center">
        Show Frontline Workers That We Care
      </StyledTypography>
      <StyledTypography color="inherit" align="center" variant="h5" className={classes.h5}>
      Join the movement in supporting the mental health of our frontline workers, one note at a time.
      </StyledTypography>
      
      <FirebaseContext.Consumer >
          {firebase => (<HomeStatWidget firebase={firebase} className={classes.widgetRow}/>)}
        </FirebaseContext.Consumer>
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
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);