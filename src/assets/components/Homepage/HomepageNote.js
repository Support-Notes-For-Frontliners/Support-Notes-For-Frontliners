import React from 'react'
import {Paper, makeStyles, Typography} from '@material-ui/core'

// const width=32
// const height=40
// const wordPad = 3
// const backPad = 4

const useStyles = makeStyles({

    note: (props) => ({
        height: props.theme.spacing(props.style.height+2*props.style.wordPad+props.style.backPad),
        width: props.theme.spacing(props.style.width+2*props.style.wordPad+props.style.backPad),
        margin: "60px 30px 10px 10px",
    }),
    notePaper: (props)=>({
        width: props.theme.spacing(props.style.width+2*props.style.wordPad),
        height: props.theme.spacing(props.style.height+2*props.style.wordPad),
        padding: props.theme.spacing(props.style.wordPad),
        position:"relative",
        top: props.theme.spacing(-props.style.height-2*props.style.wordPad + props.style.backPad),
        left: props.theme.spacing(props.style.backPad),
    }),
    wrapPaper: (props)=> ({
        backgroundColor: props.style.backColor,
        width: props.theme.spacing(props.style.width+props.style.wordPad*2),
        height: props.theme.spacing(props.style.height+props.style.wordPad*2),
        
    }),
})

function Note(props){
    // const theme = useTheme()
    const classes = useStyles(props)

    return (
        <div className={classes.note}>
            <Paper className={classes.wrapPaper}>
            </Paper>
            <Paper className={classes.notePaper} style={{}}>
                <Typography>
                    Dear Health Care Worker,    
                    Thank you for helping save lives! I am so beyond thankful and grateful for all that you have done! You inspire me in so many ways! Thank you for the sacrifices made as well! Stay strong and stay safe!
                    -From a student at Newport High School
                    <br></br>
                    {props.index}
                </Typography>
            </Paper>
        </div>
    )
}

export default Note;