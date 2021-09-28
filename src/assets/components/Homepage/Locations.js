import React from "react";
import ReactDOM from "react-dom";
import { Grid, Container, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/core/styles";
import LocationNote from "./LocationCard";
import StyledTypography from "../StyledTypography";
import FirebaseContext from "../FireBase/FireBaseContext";

// style for cards
const cardStyle = {
  width: 30,
  // height: 5,
  wordPad: 1,
};

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const styles = (theme) => ({
  html: {
    scrollBehavior: "smooth",
  },
  root: {
    backgroundColor: theme.palette.primary.light,
  },
  slider: {
    scrollBehavior: "smooth",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  arrow: {
    position: "relative",
    top: theme.spacing(
      -0.5 * (cardStyle.height + cardStyle.wordPad * 2 + cardStyle.backPad + 10)
    ),
    display: "inline-block",
    cursor: "pointer",
  },
  sliderStart: {
    height: "100%",
  },
  h6: {
    [theme.breakpoints.up('sm')]: {
      fontSize: "1.6rem"
    }
  },
  h5: {
    [theme.breakpoints.up('md')]: {
      fontSize: "2.2rem"
    }
  }
    
});

function LocationCards(props) {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => <Cards firebase={firebase} {...props} />}
    </FirebaseContext.Consumer>
  );
}

function Cards(props) {
  // style for moi
  const classes = props.classes;
  const [locationData, setData] = React.useState(null);
  // const locationData = props.LocationData;?
  const theme = useTheme();

  const locationRef = props.firebase.db.ref("locationData/locations");
  React.useEffect(() => {
    locationRef.on("value", gotStatData, errData);
  }, []);
  function gotStatData(data) {
    data = data.val();
    const total = {
      // "Currently Delivering To:": [],
      "Deliveries Completed To:": [],
    };
    Object.keys(data).forEach((element) => {
      data[element].forEach((loc) => {
        total[
          loc.enabled ? "Currently Delivering To:" : "Deliveries Completed To:"
        ].push(loc);
      });
    });
    setData(total);
  }
  function errData(err) {
    console.log("Error!");
    console.log(err);
  }

  // breakpoints for the grid
  const matches = useMediaQuery(theme.breakpoints.only("xs"));
  // find an integer number of card widths to move. at least try to move one card width

  const sliderRef = React.useRef();
  const sliderPosRef = React.useRef();

  function opacity() {
    if (locationData === null) {
      return { opacity: "0" };
    } else {
      return { opacity: "1", transition: "all 1s ease" };
    }
  }
  return (
    <div className={classes.root} style={opacity()}>
      {!locationData ? (
        <></>
      ) : (
        <>
        <Container>
          <div style={{ display: "inline-block", marginTop: "30px" }}>
            <StyledTypography color="inherit" className = {classes.h5} variant={"h5"} marked="Left">
              View Our Locations
            </StyledTypography>
          </div>
          </Container>
          <Container>
          <Grid
            container
            direction="column"
            spacing={0}
            style={{ flexWrap: "nowrap", overflowX: "hide" }}
          >
            {locationData ? (
              Object.keys(locationData).map((val) => (
                <div style={{ marginBottom: 10 }}>
                  <Grid item style={{ marginLeft: 30, marginTop: 20 }}>
                    <div style={{ display: "inline-block" }}>
                      <Typography className = {classes.h6} color="inherit" variant={"h6"}>
                        {val}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    className={classes.slider}
                    style={{
                      marginLeft: 40,
                      marginTop: 0,
                      // flexWrap: "nowrap",
                      overflowX: "auto",
                      flexWrap: matches ? "nowrap" : "wrap",
                      // overflow: matches ? "scroll" : "scroll",
                    }}
                  >
                    {locationData[val].map((datapoint, index) => {
                      return (
                        <Grid item key={"locationnote" + index}>
                          <LocationNote
                            theme={theme}
                            style={{
                              ...cardStyle,
                            }}
                            datapoint={datapoint}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              ))
            ) : (
              <></>
            )}
          </Grid>
           </Container>
        </>
      )}
      <br/>
    </div>
  );
}

export default withStyles(styles)(LocationCards);
