import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import FastAverageColor from "fast-average-color";
import CardMedia from "@material-ui/core/CardMedia";
import tinycolor from "tinycolor2";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const fac = new FastAverageColor();

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  grid: {
    flexGrow: 1,
  },
  note: (props) => ({
    height: props.theme.spacing(
      props.style.height + 2 * props.style.wordPad + props.style.backPad
    ),
    width: props.theme.spacing(
      props.style.width + 2 * props.style.wordPad + props.style.backPad
    ),
    margin: "30px 30px 10px 10px",
  }),
  // media: {
  //   height: 0,
  //   paddingTop: "56.25%", // 16:9
  //   borderRadius: 5,
  // },
  infoSlide: (props) => ({
    marginTop: props.theme.spacing(props.style.wordPad),
    padding: props.theme.spacing(props.style.wordPad),
  }),
  notePaper: (props) => ({
    width: props.theme.spacing(props.style.width + 2 * props.style.wordPad),
    height: props.theme.spacing(props.style.height + 2 * props.style.wordPad),
    // padding: props.theme.spacing(props.style.wordPad),
    // position: "relative",
    // top: props.theme.spacing(
    //   -props.style.height - 2 * props.style.wordPad + props.style.backPad
    // ),
    // left: props.theme.spacing(props.style.backPad),
  }),
  wrapPaper: (props) => ({
    backgroundColor: props.style.backColor,
    width: props.theme.spacing(props.style.width + props.style.wordPad * 2),
    height: props.theme.spacing(props.style.height + props.style.wordPad * 2),
  }),
});

function LocationNote(props) {
  // const theme = useTheme()
  const classes = useStyles(props);

  const { img, name, region } = props.datapoint;
  const [bgColor, setBgColor] = React.useState(null);
  const [highlightColor, setHighlightColor] = React.useState(null);

  React.useEffect(() => {
    fac.getColorAsync(img).then(function (color) {
      setHighlightColor(tinycolor(color.hex).saturate(30).brighten(30));
      setBgColor(tinycolor(color.hex).saturate(30));
    });
  }, []);
  return (
    <div className={classes.note}>
      {bgColor == null ? (
        <></>
      ) : (
        <Card className={classes.notePaper}>
          <CardActionArea
            style={{ backgroundColor: highlightColor.toString() }}
          >
            <CardMedia image={img} title={name} className={classes.media} />
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                {name}
              </Typography>
              <Typography variant="body1">
                {region}
                <br></br>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
}

export default LocationNote;

//Old Note Code
// <Paper
//   className={classes.notePaper}
//   style={{ backgroundColor: bgColor.toString() }}
// >
//   <CardMedia image={img} title={name} className={classes.media} />
//   <Paper
//     className={classes.infoSlide}
//     style={{
//       backgroundColor: highlightColor.toString(),
//     }}
//   >
//     <Typography variant="h6" style={{ fontWeight: "bold" }}>
//       {name}
//       <br></br>
//     </Typography>
//     <Typography variant="body1">
//       {region}
//       <br></br>
//     </Typography>
//   </Paper>
// </Paper>
