import React from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
    circle: props => ({
        width: props.width,
        height: props.width,
        display:"inline-block",
    }),
    iconButton:{
        border: "2px solid rgba(0,0,0,0.1)",
    },
})

function Arrow(props){
    const classes = useStyles(props)

    const direction = props.direction

    // if up
    var rot=-90
    if (direction==='right'){
        rot=0
    }
    else if (direction==='down'){
        rot=90
    }
    else if (direction ==='left'){
        rot=180
    }

    return (
        <div className={[classes.circle]} onClick={props.onClick}>
            <IconButton disabled={props.disabled} className={classes.iconButton} aria-label="arrow" size="medium" style={{transform: "rotate("+rot+"deg)"}}>
                <ArrowForwardIosIcon fontSize="inherit"  />
            </IconButton>
        </div>
    )
}

export default Arrow