import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from './StyledTypography';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" >
        Notes for Frontliners
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden'
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
  },
  iconsWrapper: {
    height: 120,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));


export default function AppFooter() {
  const classes = useStyles();

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item className={classes.icons}>
                <a href="mailto:trevorkw7@gmail.com?Subject=Question%20About%20Your%20Website" className={classes.icon}>
                  <img style={{height: "30px"}}src="/images/email-svgrepo-com.svg" alt="Email" />
                </a>
                <a href="https://www.instagram.com/notesforfrontliners/" className={classes.icon}>
                  <img style={{height: "30px"}} src="/images/instagram-svgrepo-com.svg" alt="Instagram" />
                </a>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Navigation
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link style={{color:"black"}} href="/Notes">Write a Note</Link>
              </li>
              <li className={classes.listItem}>
                <Link style={{color:"black"}} href="/about">About</Link>
              </li>
            </ul>
          </Grid> */}
          <Grid item xs={12}>
            <Typography variant="caption">
              {'Icons made by '}
              <Link rel="sponsored" title="SVG Repo" style={{color:"black"}}>
                SVG Repo
              </Link>
              {' from '}
              <Link  style={{color:"black"}}href="https://www.svgrepo.com/" rel="sponsored" title="Flaticon">
                www.svgrepo.com/
              </Link>
              {' is licensed by via CC0'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}