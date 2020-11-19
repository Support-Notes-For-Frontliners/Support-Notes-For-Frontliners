import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SelectLocation from "./assets/components/SelectLocation";
import SelectFrontliner from "./assets/components/SelectFrontliner";
import WriteNote from "./assets/components/WriteNote.js";
import { Grid } from "@material-ui/core";
import { animateScroll as scroll } from "react-scroll";
import { Prompt } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  cards: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
    flexGrow: 1,
  },
  nextbutton: {
    margin: theme.spacing(1),
    position: "relative",
    float: "right",
  },
  backbutton: {
    margin: theme.spacing(1),
    position: "relative",
    float: "right",
  },
  completed: {
    display: "inline-block",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  containerDiv: {
    margin: "auto",
  },
  image: {
    flex: 0,
    width: null,
    height: null,
  },
  caption: {
    flex: 1,
    width: null,
    height: null,
  },
}));

function getSteps() {
  return [
    "Select a Frontliner",
    "Select a Location",
    "Write an Encouraging Note",
  ];
}

export default function ProgressStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [btnDisabled, setBtnDisabled] = React.useState(true);

  //Step 1:
  const [cardSelected, setCardSelected] = React.useState(null);
  //Step 2:
  const [facility, setFacility] = React.useState(null);
  //Step 3:
  const [noteContent, setNoteContent] = React.useState(null);
  const [senderName, setSenderName] = React.useState(null);
  const [referrerName, setReferrerName] = React.useState(null);
  const [nhsName, setNhsName] = React.useState(null);

  const steps = getSteps();

  let formRef = props.firebase.db.ref("formData");
  const [locationData, setLocationData] = React.useState(null);
  let locationRef = props.firebase.db.ref("locationData");

  React.useEffect(() => {
    locationRef.on("value", gotData, errData);
  }, []);
  React.useEffect(() => {
    scroll.scrollTo(0);
  }, [activeStep]);

  function errData(err) {
    console.log("Error!");
    console.log(err);
  }

  function gotData(dataIn) {
    setLocationData(dataIn.val());
  }

  React.useEffect(() => {
    
    //if normal fields are filled
    if (noteContent !== null && senderName !== null && noteContent !== "" && senderName !== "") {
      //if on ref note page and refnote not filled 
      if(window.location.pathname !== "/note" && (referrerName === null || referrerName === "") || (nhsName === null || nhsName === "")){
        setBtnDisabled(true);
      }
      //if all filled
      else{
        setBtnDisabled(false)
      }
    }
    //if normal fields are empty
    else {
      setBtnDisabled(true)
    }

  }, [noteContent, senderName, referrerName, nhsName])

  function getStepContent(step) {
    switch (step) {
      case 0:
        return locationData == null ? (
          <></>
        ) : (
          <SelectFrontliner
            elementSelected={cardSelected}
            stepperCallback={handleFrontliner}
            data={locationData["frontliners"]}
          />
        );
      case 1:
        return locationData === null ? (
          <></>
        ) : (
          <SelectLocation
            elementSelected={facility}
            locationType={cardSelected}
            stepperCallback={handleLocation}
            data={locationData["locations"]}
          />
        );
      case 2:
        return <WriteNote stepperCallbackDescription={handleSender} stepperCallbackNote={handleNote} stepperCallbackReferrer={handleReferrer} stepperCallbackNHS={handleNhs} recipient={cardSelected} />
      default:
        return "Unknown step";
    }
  }

  function handleFrontliner(frontlinerData) {
    setCardSelected(frontlinerData);
  }

  function handleLocation(locationData) {
    setFacility(locationData);
  }
  function handleNote(noteData) {
    if (noteData === "") {
      setNoteContent(null);
    }
    setNoteContent(noteData);
  }
  function handleSender(senderData) {
    if (senderData === "") {
      setSenderName(null);
    }
    setSenderName(senderData);
  }
  function handleReferrer(referrerData) {
    if (referrerData === "") {
      setReferrerName(null)
    }
    setReferrerName(referrerData);
    console.log(referrerData)
  }
  function handleNhs(nhsData){
    if (nhsData === ""){
      setNhsName(null)
    }
    setNhsName(nhsData);
    console.log(nhsData);
  }

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    handleComplete();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    if (getStepValue(step - 1) !== null || step === 0) {
      setActiveStep(step);
    }
  };

  function getStepValue(step) {
    switch (step) {
      case 0:
        return cardSelected;
      case 1:
        return facility;
      case 2:
        return [noteContent, senderName];
      default:
        return null;
    }
  }

  const handleSubmit = () => {
    handleComplete();
    handleNext();
    // console.log(cardSelected)
    // console.log(facility)
    // console.log(noteContent)
    // console.log(senderName)
    let formData = {
      frontliner: cardSelected,
      facility: facility,
      note: noteContent,
      sender: senderName,
      referrer: referrerName,
      nhs: nhsName,
      approved: false,
      sent: false,
    };
    saveFormData(formData);
  };

  function saveFormData(data) {
    var newFormRef = formRef.push();
    newFormRef.set(data);
  }

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCardSelected(null);
    setFacility(null);
    setNoteContent(null);
    setSenderName(null);
    setCompleted({});
  };

  // useEffect(()=>console.log(cardSelected), [cardSelected])
  // useEffect(()=>console.log(facility), [facility])

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton
              onClick={handleStep(index)}
              completed={completed[index]}
            >
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className={classes.cards}>
        {allStepsCompleted() ? (
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "50vh" }}
          >
            <Grid item xs={12} md={3}>
              <img
                alt="sending gif"
                className={classes.image}
                src="/images/sending.gif"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                align="center"
                className={classes.caption}
                variant="h6"
              >
                Thanks for writing a note! Your note will be mailed to your
                chosen facility soon.
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <br />
              <br />
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleReset}
              >
                Support More Frontliners!
              </Button>
            </Grid>
          </Grid>
        ) : (
          <>
            <Prompt
              when={!allStepsCompleted() && cardSelected !== null}
              message="You have unsaved changes, are you sure you want to leave?"
            />
            <Grid container direction="column" justify="center">
              <Grid id="step-content" item xs={12}>
                {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                {getStepContent(activeStep)}
              </Grid>

              <Grid style={{ marginTop: "5vh" }} item id="navigation" xs={12}>
                {isLastStep() ? (
                  <Button
                    disabled={btnDisabled}
                    className={classes.nextbutton}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                ) : null}
                {isLastStep() ? null : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.nextbutton}
                    disabled={getStepValue(activeStep) === null ? true : false}
                  >
                    Next
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.backbutton}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    </div>
  );
}
