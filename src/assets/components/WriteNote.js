import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid, createMuiTheme, ThemeProvider, FormGroup, FormControlLabel, RadioGroup, Radio} from '@material-ui/core';
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

export default function NoteInterface({recipient, stepperCallbackNote, stepperCallbackDescription, stepperCallbackReferrer, stepperCallbackNHS}) {
  
  const [noteContent, setNoteContent] = React.useState(null)
  const [writerDescription, setWriterDescription] = React.useState(null);
  
  const[customFormData, setCustomFormData] = React.useState(null)
  
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

  function handleReferrerChange(event){
    event.preventDefault()
    stepperCallbackReferrer(event.target.value)
  }

  function handleNHSChange(event){
    event.preventDefault()
    stepperCallbackNHS(event.target.value)
  }

  const handleRadioButtons = (event) => {
    setCustomFormData(event.target.value);
  };

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <animated.div style={springProps}>
    <div className={classes.root}>
      <Grid container spacing={2}>
      <ThemeProvider theme={theme}>
      <Grid item sm={12} md={2}>
          <Paper variant="outlined" className={classes.sticky_note} >
            <Typography variant="h6" align="center" gutterBottom>What To Do</Typography>
            <Typography>• Make the note a good length! Spend 2-5 sentences to write something nice, thoughtful, and encouraging!</Typography>
            <Typography>• To make the note more personal, adress the person as an individual</Typography>
            <Typography>• Address the note anonymously with context when writing in the "Who You Are" box ("From a Teacher in Ballard") </Typography>
          </Paper>
          <Paper variant="outlined" className={classes.sticky_note} >
            <Typography align="center" variant="h6" >What Not To Do</Typography>
            <Typography>• Don't give your personal information (First and Last Name)!</Typography>
            <Typography>• Don't repeat the built in "Dear" and "From" statements built into the note. Take a look at the "note preview" to see how your note will appear when sent.</Typography>
            <Typography>• Don't talk about a limited time promotion or event. These notes take time to send so the note maybe be rendered irrelevant by the time it is received. </Typography>
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
          variant="outlined"
          fullWidth
          style={{marginTop:"5px"}}
          
          onChange={handleDescriptionChange}
        />
        
        {window.location.pathname === "/refnote" && 
            <FormGroup row>
              <RadioGroup value={customFormData} onChange={handleRadioButtons}>
                <FormControlLabel 
                control={<Radio/>} 
                label="I was referred to write a note"
                value="reffered"
                />
                <FormControlLabel 
                control={<Radio/>} 
                label="I'm writing a note for volunteer hours"
                value="volunteer"
                />
              </RadioGroup>
            </FormGroup>
        }

        {customFormData === "reffered" &&
          <TextField
          id="Referrer"
          label="Who Referred You (Their Name)"
          variant="outlined"
          fullWidth
          style={{marginTop:"10px", width:300}}

          onChange={handleReferrerChange}
          />
        }

        {customFormData === "volunteer" &&
          <TextField
          id="Referrer"
          label="Your Name"
          variant="outlined"
          fullWidth
          style={{marginTop:"10px", width:300}}

          onChange={handleReferrerChange}
          />
        }

      
        
        {window.location.pathname === "/nhsnote" &&
          <TextField
            id="NHSName"
            label="Your first and last name (for NHS)"
            variant="outlined"
            fullWidth
            style={{marginTop:"10px", width:300}}

            onChange={handleNHSChange}
          />
        }
        </div>
        </Grid>
      </Grid>
    </div>
    </animated.div>
  );
}