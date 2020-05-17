import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import StyledTypography from './StyledTypography'
import ProductHeroLayout from './ProductHeroLayout';
import { animateScroll as scroll} from 'react-scroll'
import HomeStatWidget from './HomeStatWidget.js';
import FirebaseContext from './FireBase/FireBaseContext';

const backgroundImage =
  'https://calmatters.org/wp-content/uploads/sites/2/2020/04/iStock_masks_illustration_01.jpg?fit=2000%2C1333';

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

function ProductHero(props, { parentCallback }) {

  function handleClick() {
    scroll.scrollTo(700);
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
      Our mission is to support workers who risk their lives daily to fight against the COVID-19 pandemic.
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
        // href="/note"
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