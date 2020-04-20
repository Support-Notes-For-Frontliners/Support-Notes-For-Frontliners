import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useSpring, animated } from 'react-spring'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
  },
  letter_paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(1),
    textAlign: "Left",
    marginBottom: "2vh",
    minHeight: '65vh',
  },
  sticky_note: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  input:{
    paddingRight:"2vh",
    paddingLeft:"2vh"
  },
  from_display:{
    bottom: '0px',
    right: '0px'
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Bad Script',
    ].join(','),
  }
});

const height = 535

export default function NoteInterface({recipient, stepperCallbackNote, stepperCallbackDescription}) {
  const [noteContent, setNoteContent] = React.useState(null)
  const [writerDescription, setWriterDescription] = React.useState(null);
  
  const classes = useStyles();

  function handleInputChange(event){
    event.preventDefault()
    setNoteContent(event.target.value);
    stepperCallbackNote(event.target.value)
    
  }
  
  function handleDescriptionChange(event){
    event.preventDefault()
    setWriterDescription(event.target.value);
    stepperCallbackDescription(event.target.value);
  }

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <animated.div style={springProps}>
    <div className={classes.root}>
      <Grid container spacing={2}>
      <ThemeProvider theme={theme}>
      <Grid item sm={12} md={2}>
          <Paper variant="outlined" className={classes.sticky_note} >
            <Typography variant="h6" align="center" gutterBottom>Tips for Writing a Note</Typography>
            
            <Typography>• Make it encouraging! Our goal should be 
              to let frontliners know that we support them.
            </Typography>
            <Typography>• Address the person as an individual ("you") rather than a group ("you guys").</Typography>
            <Typography>• Don't give your personal information! Instead address the note anonymously with context ("From an 2nd Grader in Bellevue").</Typography>
          </Paper>
          <Paper variant="outlined" className={classes.sticky_note} >
            <Typography align="center" variant="h6" gutterBottom>Example</Typography>
            <br/>
            <Typography variant="body2" align="left">Dear Health Care Worker,</Typography>
            <br></br>
            <Typography align="left" variant="body2">Thank you for risking your life daily to support the needs of others. I want to tell you how much you are 
            appreciated and recognized by the community. You are truly the hero we need in these desperate times. Stay safe and don't give up hope! 
            </Typography>
            <br></br>
            <Typography variant="body2" align="right">-From a Middle Schooler in Seattle</Typography>
          </Paper>
        </Grid>
        </ThemeProvider>
        <Grid item xs={12} sm={12} md={4}>
        <div>
          <Paper className={classes.letter_paper}>
            
            <ThemeProvider theme={theme}>
              <Typography variant="h5" align="center">Note Preview</Typography>
            <span></span>
            <br/>
            <Typography>Dear {recipient.substring(0,recipient.length-1)},</Typography>
            <br/>
            <Typography>{noteContent}</Typography>
            <br/>
            <br/>
            <Typography align="right" className={classes.from_display}>
              -From {writerDescription}
            </Typography>
            </ThemeProvider>
          </Paper>
          </div>

        </Grid>
        <Grid item sm={12} md={6}>
        <div className={classes.input}>
        <TextField
        onChange={handleInputChange}
          id="note-input-box"
          label="Write Your Note"
          multiline
          rows={4}
          // defaultValue="Dear Worker"
          variant="outlined"
          fullWidth
          margin = 'dense'
          
          inputProps={{
            style: {
              height,
            },
        }}
        />
        <TextField
          id="Writer Description"
          label="Who You Are (No Personal Details)"
          rows={4}
          variant="outlined"
          fullWidth
          style={{marginTop:"5px"}}
          
          onChange={handleDescriptionChange}
        />
        </div>
        </Grid>
      </Grid>
    </div>
    </animated.div>
  );
}