import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StyledTypography from './assets/components/StyledTypography'
import AboutLayout from './assets/components/AboutLayout';
import { Grid, Container } from '@material-ui/core';
import Footer from './assets/components/Footer'
import OtherWebsite from './assets/components/OtherWebsite'
import { useSpring, animated } from 'react-spring'


const backgroundImage =
  'https://lh3.googleusercontent.com/proxy/LbltJKZK1lAkcVOj6H0xA0xQmQo_dM5PKGA9DQaGqHv0uz9uUXcFzp6s2EzhMJLD5lCecU7g46spwPSPbMwyBF0RBaPgqO35XP-fOqFhdw4bQvCNFllRegM5Y9wDPMcyy6FgVUmz2Q';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: "#C8E8EA",
    paddingBottom: theme.spacing(4)
  },

  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  body1: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  more: {
    marginTop: theme.spacing(2),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
});

function ProductHero(props, { parentCallback }) {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } })


  const { classes } = props;

  return (
    <animated.div style={springProps}>
    <div>
      <AboutLayout backgroundClassName={classes.background}>
        {/* Increase the network loading priority of the background image. */}
        <img style={{ display: 'none' }} src={backgroundImage} alt="increase priority" />
        <StyledTypography color="inherit" align="center" variant="h2" marked="center">
          About this Project
      </StyledTypography>
        <StyledTypography color="inherit" align="center" variant="h5" className={classes.h5}>
        Support Notes For Frontliners is a note submission platform that lets people show their support the heroes of our community. This project was created in response to the mental stress and trauma that continues to affect frontline workers who risk their lives daily to battle against the COVID-19 disease. Contribute to the project by writing an encouraging note to a frontliner to let them know that they are appreciated and are not alone in this fight.
      </StyledTypography>
      </AboutLayout>

      <section className={classes.root}>
        <Container className={classes.container}>
          <div>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6}>
                <StyledTypography marked="center" className = {classes.h5} color="inherit" align="center" variant="h4">
                  Inspiration 
              </StyledTypography>
              <StyledTypography  className = {classes.body1} color="inherit" align="left" variant="body1">
              As a high schooler interested in web development, I started the Support Notes for Frontliners project after learning about the heavy mental toll people battling COVID-19 at the frontlines experience. I first became aware of this issue while watching a live stream sermon from my church, where the pastor described a fellow church member and medical worker who experiences anxiety and trauma from her work every day, while still coming home to support her family. In response, I used some of my experience in web development to create Support Notes For Frontliners as a platform to connect the community to frontline workers who are in need of support. These people risk their lives every day to save lives every day. It is time for us to give back by providing the support that our heroes need.
              </StyledTypography>  
              </Grid>
              <Grid item xs={12} sm={6}>
              <StyledTypography marked="center" className = {classes.h5} color="inherit" align="center" variant="h4">
                  Other COVID-19 Projects
              </StyledTypography>
              <OtherWebsite/>
              </Grid>

              {/* <Grid item xs={4}>
              <Avatar alt="Trevor K" src="/static/images/avatar/1.jpg" className={classes.large} />
              </Grid> */}
            </Grid>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
    </animated.div>

  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);