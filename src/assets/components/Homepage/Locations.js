import React from "react";
import ReactDOM from "react-dom";
import { Grid, Container, Typography } from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/core/styles";
import LocationNote from "./LocationCard";
import StyledTypography from "../StyledTypography";
import FirebaseContext from "../FireBase/FireBaseContext";

// style for cards
const cardStyle = {
  width: 32,
  // height: 5,
  wordPad: 1,
};

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const styles = (theme) => ({
  html: {
    scrollBehavior: "smooth",
  },
  root: {
    backgroundColor: "#E1F3F4",
  },
  slider: {
    flexWrap: "nowrap",
    overflow: "scroll",
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
      "Currently Delivering To:": [],
      "Deliveries Completed To:": [],
    };
    Object.keys(data).forEach((element) => {
      console.log(data, element);
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

  const totalCardPxWidth =
    theme.spacing(cardStyle.width + cardStyle.wordPad * 2 + cardStyle.backPad) +
    40;

  const data = ["a", "a", "a"];

  const contentWidth = theme.breakpoints.values.lg;

  // check for window resize
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    function resizeListener() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const minOffset = Math.max((windowWidth - contentWidth) / 2, 0); // max scroll to left
  const maxOffset = -1 * data.length * totalCardPxWidth + windowWidth; // this is max scroll to right

  // control cards movement, start with min
  const [offset, setOffset] = React.useState(-minOffset);

  // find an integer number of card widths to move. at least try to move one card width
  const slideDist = Math.max(
    Math.ceil(
      Math.floor(windowWidth / totalCardPxWidth / 2) * totalCardPxWidth
    ),
    totalCardPxWidth
  );

  const sliderRef = React.useRef();
  const sliderPosRef = React.useRef();

  const [isGridHovered, setIsGridHovered] = React.useState(false);
  function opacity() {
    if (locationData === null) {
      return { opacity: "0" };
    } else {
      return { opacity: "1", transition: "all 1s ease" };
    }
  }
  return (
    <div
      className={classes.root}
      onMouseOver={() => setIsGridHovered(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setIsGridHovered(false);
        }, 50)
      }
      style={opacity()}
    >
      {!locationData ? (
        <></>
      ) : (
        <Container>
          <div style={{ display: "inline-block", marginTop: "30px" }}>
            <StyledTypography color="inherit" variant={"h4"} marked="center">
              View Our Locations
            </StyledTypography>
          </div>
          {/* <Typography
            variant="p"
            style={{
              float: "right",
              marginTop: window.innerWidth > 537 ? "70px" : "10px",
              fontWeight: "400",
            }}
          >
            Scroll!
          </Typography> */}
          <Grid container direction="column" spacing={0}>
            {locationData ? (
              Object.keys(locationData).map((val) => (
                <div style={{ marginBottom: 10 }}>
                  <Grid item style={{ marginLeft: 30, marginTop: 20 }}>
                    <div style={{ display: "inline-block" }}>
                      <Typography color="inherit" variant={"h5"}>
                        {val}
                      </Typography>
                    </div>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    spacing={0}
                    style={{
                      marginLeft: 40,
                      marginTop: 0,
                      // scrollPaddingBlockEnd: 20,
                    }}
                    className={classes.slider}
                  >
                    {locationData[val].map((datapoint, index) => {
                      return (
                        <Grid item key={"locationnote" + index}>
                          <LocationNote
                            theme={theme}
                            style={{
                              ...cardStyle,
                              // backColor: cardColors[index % cardColors.length],
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

            {/* <Grid container direction="row">
          {locationData["completed"].map((datapoint, index) => {
            return (
              <Grid item key={"locationnote" + index}>
                <LocationNote
                  theme={theme}
                  style={{
                    ...cardStyle,
                    backColor: cardColors[index % cardColors.length],
                  }}
                  datapoint={datapoint}
                />
              </Grid>
            );
          })}
        </Grid> */}
          </Grid>
        </Container>
      )}
    </div>
  );
}

export default withStyles(styles)(LocationCards);
