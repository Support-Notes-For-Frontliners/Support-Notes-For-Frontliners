import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from './StyledTypography';
import { Button } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";


const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: "#C8E8EA",
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(15),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
  button:{
      marginTop: theme.spacing(2),
      height: 48,
      padding: '0 30px', 
  }
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
      <div>
        <Grid container spacing={5}>
            <Grid item xs={12}>
            <Typography color="inherit" align="center" variant="h4" marked="center">
        How It Works
      </Typography>
            </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/images/hospital-svgrepo-com.svg"
                alt="suitcase"
                style={{background: '#C8E8EA'}}
              />
              <Typography align="center" variant="h5" className={classes.title}>
                1. Select a Frontliner and Location
              </Typography>
              <Typography align="center" variant="body1">
                Select a worker you want to support and choose the location
                you want your note to be delivered to.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/images/notebook-svgrepo-com.svg"
                alt="graph"
              />
              <Typography variant="h5" className={classes.title}>
                2. Write a Note
              </Typography>
              <Typography align="center" variant="body1">
                Write an encouraging and thoughtful note to support the worker
                you have chosen.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="/images/mailing-email-svgrepo-com.svg"
                alt="clock"
              />
              <Typography variant="h5" align="center" className={classes.title}>
                3. We Send Your Note
              </Typography>
              <Typography align="center" variant="body1">
                Your note will be delivered to the location worker of your choosing.
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container direction="column" alignItems="center" spacing={5}>
        <Grid item xs={12}>
                <Link underline="none" component={RouterLink} to="/note">
                <Button color="secondary" variant="contained" className={classes.button}>Get Started</Button>
                </Link>
            </Grid>
            </Grid>
        </div>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);