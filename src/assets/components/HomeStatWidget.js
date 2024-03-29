import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(10, 0, 4, 0),
    textAlign: "left"
  },
  widget: {
    color: "black",
  },
  h1: {
    fontSize: '3rem',
    fontWeight: '600',
    display: "inline",
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem'
    },
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: '600',
    display: "inline",
    [theme.breakpoints.down('md')]: {
      fontSize: '1.25rem'
    },
  },
  body1: {
    margin: theme.spacing(1, 0, 1, 0),
    maxWidth: "375x",
    width: "80%",
    color: "#606060",
  }
}));

export default function HomeStatWidget({ firebase }) {
  const [orgStats, setOrgStats] = React.useState(null);

  const orgStatsRef = firebase.db.ref("stats");

  React.useEffect(() => {
    orgStatsRef.on("value", gotStatData, errData);
  }, []);

  function gotStatData(data) {
    setOrgStats(data.val());
  }
  function errData(err) {
    console.log("Error!");
    console.log(err);
  }
  function opacity() {
    if (orgStats === null) {
      return { opacity: "0" };
    } else {
      return { opacity: "1", transition: "all 1s ease" };
    }
  }
  // const xsVal = 4;
  const classes = useStyles();
  return (

    <Grid
      container
      spacing={0}
      justify="center"
      alignItems="flex-start"
      style={opacity()}
      className={classes.container}
    >
      <Grid item xs={12} md={4} className={classes.widget}>
        <Typography variant="h3" className={classes.h1}>
          {orgStats ? orgStats["facility_count"] : 7}
        </Typography>
        <Typography className={classes.h2}> Total Facilities</Typography>
        <Typography variant="body1" className={classes.body1}>
          We've proudly delivered your notes to 4 homeless shelters, 3 nursing homes, and 7 hospitals in the Greater Seattle Area.
        </Typography>
      </Grid>

      <Grid item xs={12} md={4} className={classes.widget}>
        <Typography variant="h3" className={classes.h1}>
          {orgStats ? orgStats["notes_count"] : 374}
        </Typography>
        <Typography className={classes.h2}> Notes Written</Typography>
        <Typography variant="body1" className={classes.body1}>
          We are a community driven organization that depends on people like you. Thank you for contributing to our cause and helping reach our goal by writing a personal note.
        </Typography>
      </Grid>

      <Grid item xs={12} md={4} className={classes.widget}>
        <Typography variant="h3" className={classes.h1}>
          {/* {orgStats ? orgStats["sent_count"] : 67} */}
          1012
        </Typography>
        <Typography className={classes.h2} > Notes Delivered</Typography>
        <Typography variant="body1" className={classes.body1}>
          Thanks to the support of the community, we've delivered over 1000 notes! Each and every note delivered is a message of encouragement, a token of appreciation, and a powerful tool to raise awareness about worker mental health.
        </Typography>
      </Grid>

    </Grid>
  );
}
