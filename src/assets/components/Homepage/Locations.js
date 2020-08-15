import React from "react";
import ReactDOM from "react-dom";
import { Grid, Container, Typography } from "@material-ui/core";
import { useTheme, withStyles } from "@material-ui/core/styles";
import LocationNote from "./LocationCard";
import StyledTypography from "../StyledTypography";


// style for cards
const cardStyle = {
  width: 32,
  // height: 5,
  wordPad: 1,
};
const cardColors = [
  "#fd9ba3",
  "#fedac3",
  "#b7ead7",
  "#feb7b3",
  "#c8cfe9",
  "#e2f0cd",
];

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
    // overflow:"hidden",
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
  // style for moi
  const classes = props.classes;
  const locationData = props.LocationData;
  const theme = useTheme();

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
  // console.log("min " + minOffset)
  // console.log("max " + maxOffset)

  // control cards movement, start with min
  const [offset, setOffset] = React.useState(-minOffset);

  // find an integer number of card widths to move. at least try to move one card width
  const slideDist = Math.max(
    Math.ceil(
      Math.floor(windowWidth / totalCardPxWidth / 2) * totalCardPxWidth
    ),
    totalCardPxWidth
  );
  // console.log("dist" + slideDist)
  // console.log("offset" + offset)

  const sliderRef = React.useRef();
  const sliderPosRef = React.useRef();

  const [isGridHovered, setIsGridHovered] = React.useState(false);
  const [isRightButtonHovered, setIsRightButtonHovered] = React.useState(false);
  const [isLeftButtonHovered, setIsLeftButtonHovered] = React.useState(false);

  function handleClick(direction) {
    const currentPos = -ReactDOM.findDOMNode(
      sliderPosRef.current
    ).getBoundingClientRect().x;
    // console.log("current "+currentPos)

    var scrollTo = currentPos;
    if (direction === "right") {
      scrollTo =
        currentPos + minOffset + slideDist - (currentPos % totalCardPxWidth);
    } else if (direction === "left") {
      scrollTo =
        currentPos + minOffset - slideDist - (currentPos % totalCardPxWidth);
    }

    scrollTo = Math.min(Math.max(scrollTo, -minOffset), -maxOffset + minOffset);
    ReactDOM.findDOMNode(sliderRef.current).scrollTo(scrollTo, 0);
    setOffset(scrollTo);
    // console.log("scroll to "+(scrollTo))
  }
  function handleClickRight() {
    handleClick("right");
  }
  function handleClickLeft() {
    handleClick("left");
  }

  const disabledLeft = offset === -minOffset;
  const disabledRight = offset === -maxOffset + minOffset;
  const arrowOffsetLeft = {
    left: isMobile ? "20px" : 0.25 * windowWidth + "px",
  };
  const arrowOffsetRight = {
    left: isMobile
      ? windowWidth - 120 + "px"
      : 0.75 * (windowWidth - 120) + "px",
  };
  const isDisplayButtons =
    isMobile || isGridHovered || isRightButtonHovered || isLeftButtonHovered;

  return (
    <div
      className={classes.root}
      onMouseOver={() => setIsGridHovered(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setIsGridHovered(false);
        }, 50)
      }
    >
      <Container>
        <div style={{ display: "inline-block", marginTop: "30px" }}>
          <StyledTypography color="inherit" variant={"h4"} marked="center">
            View Our Locations
          </StyledTypography>
        </div>

        <Grid container direction="column" spacing={0}>
          {Object.keys(locationData).map((val) => (
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
                spacing={4}
                style={{ marginLeft: 40, marginTop: 0 }}
                className={classes.slider}
              >
                {locationData[val].map((datapoint, index) => {
                  return (
                    <Grid
                      item
                      key={"locationnote" + index}
                      // xs={6}
                      // lg={4}
                      // md={4}
                    >
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
              </Grid>
            </div>
          ))}

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
    </div>
  );
}

export default withStyles(styles)(LocationCards);
