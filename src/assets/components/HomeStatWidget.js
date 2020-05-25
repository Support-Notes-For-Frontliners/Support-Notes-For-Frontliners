import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  widget: {
    textAlign: "center",
    padding: theme.spacing(2),
    color: "white",
  },
}));

export default function HomeStatWidget({ firebase }) {
  const [orgStats, setOrgStats] = React.useState(null);

  const orgStatsRef = firebase.db.ref("stats");

  React.useEffect(() => {
    orgStatsRef.on("value", gotStatData, errData);
  }, [orgStatsRef]);

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
  const xsVal = 4;
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      justify="center"
      alignItems="flex-start"
      style={opacity()}
    >
      <Grid item xs={xsVal} className={classes.widget}>
        <Typography variant="h3">
          {orgStats ? orgStats["facility_count"] : 7}
        </Typography>
        <Typography>Total Facilities</Typography>
      </Grid>
      <Grid item xs={xsVal} className={classes.widget}>
        <Typography variant="h3">
          {orgStats ? orgStats["notes_count"] : 374}
        </Typography>
        <Typography>Notes Written</Typography>
      </Grid>
      <Grid item xs={xsVal} className={classes.widget}>
        <Typography variant="h3">
          {orgStats ? orgStats["sent_count"] : 67}
        </Typography>
        <Typography >Notes Delivered</Typography>
      </Grid>
    </Grid>
  );
}
