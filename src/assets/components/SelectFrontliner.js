import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "typeface-bad-script";
import { useSpring, animated } from "react-spring";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  cardSelected: {
    maxWidth: 345,
    backgroundColor: "#C8E8EA",
    boxShadow: "none",
  },
  cardDisabled: {
    maxWidth: 345,
    bakcgroundColor: "#E4E4E4",
    boxShadow: "none",
  },
  media: {
    height: 140,
  },
  grid: {
    flexGrow: 1,
  },
});

export default function SelectFrontliner({
  stepperCallback,
  elementSelected,
  data,
}) {
  const classes = useStyles();
  const frontliner_list = data;
  function handleInput(e) {
    e.preventDefault();
    stepperCallback(e.currentTarget.id);
    // console.log(e.currentTarget.id);
  }

  function completedIndicator(enabled) {
    if (enabled) {
      return "";
    }
    return " (Completed)";
  }

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <animated.div style={springProps}>
      <Grid container className={classes.grid} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            <React.Fragment>
              {frontliner_list.map((frontliner, index) => (
                frontliner.enabled ? 
                <Grid key={frontliner.name + "Card"} item>
                  <Card
                    id={frontliner.name}
                    className={
                      frontliner.name === elementSelected
                        ? classes.cardSelected
                        : classes.card}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={frontliner.img}
                        alt="increase priority"
                        title={frontliner.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {frontliner.name +
                            completedIndicator(frontliner.enabled)}
                        </Typography>
                        <Typography
                          fontStyle="italic"
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {frontliner.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        id={frontliner.name}
                        onClick={handleInput}
                        size="small"
                        color="primary"
                      >
                        Select
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                : null
              ))}
              {/* <Grid key="Health Care Worker Card" item>
                            <Card className={classes.card} >
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="/images/healthworkers.jpeg"
                                        title="Health Care Workers"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Health Care Workers
                                            </Typography>
                                        <Typography fontStyle="italic" variant="body2" color="textSecondary" component="p">
                                        Health care workers are at the front line of the COVID-19 outbreak response and risk being infected daily to help the most vulnerable. As our society's first defense against COVID-19, health workers shoulder immense psychological distress and fatigue on a daily basis. Writing a note to health workers lets them know that they are appreciated for their service and are being supported as heroes of their community.

                                            </Typography>

                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button id="Health Care Workers" onClick={handleInput} size="small" color="primary">
                                        Select
                                        </Button>
                                </CardActions>

                            </Card>
                        </Grid> */}

              {/* <Grid key="Grocery Store Worker Card" item>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="/images/grocery_store_workers.jpg"
                                        title="Grocery Store Workers"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Grocery Store Workers (Coming Soon)
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        Across the country, more than two million people work in grocery stores. Deemed essential businesses, grocery stores and supermarkets are staying open even in the worst-hit communities. Grocery store workers risk their lives daily, often without personal protective equipment, to ensure their communities can continue to get access to food and other essentials. Writing a note lets grocery store workers know that they are appreciated by the community and are not alone in our fight against COVID-19.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <div ></div>
                                    <Button disabled id="Grocery Store Workers" onClick={handleInput} value={"Grocery Store Workers"} size="small" color="primary" >
                                        Select
                                     </Button>

                                </CardActions>
                            </Card>
                        </Grid> */}

              {/* <Grid key="Nursing Home Workers" item>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image="/images/nursing_home_workers.jpg"
                                        title="Nursing Home Workers"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Nursing Home Workers
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        In nursing homes across the nation, nursing home workers risk their lives daily to take care of the most vulnerable population affected by COVID-19, the elderly. Nursing home workers also endure the emotional pain of seeing the people they take care of daily pass away, with nursing homes having some of the highest death rates of any health facility in the US. Writing a note to nursing home workers helps give them much needed emotional support while making our appreciation for them known.
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <div ></div>
                                    <Button id="Nursing Home Workers" onClick={handleInput} size="small" color="primary" >
                                        Select
                                     </Button>

                                </CardActions>
                            </Card>
                        </Grid> */}
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </animated.div>
  );
}
