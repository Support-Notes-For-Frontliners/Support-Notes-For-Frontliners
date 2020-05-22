import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    widget:{
        textAlign: 'center',
        padding: theme.spacing(2),
        color: "white"
    }
}))


export default function HomeStatWidget({firebase}){
    
    const [noteCount, setNoteCount] = React.useState(null);
    const [facilityCount, setFacilityCount] = React.useState(null);

    let noteCountRef = firebase.db.ref("stats/notes_count")
    let facilityCountRef = firebase.db.ref("stats/facility_count")

    React.useEffect(()=> {
        noteCountRef.on("value", gotCountData, errData )
    }, [noteCountRef])

    React.useEffect(()=> {
        facilityCountRef.on("value", gotFacilityData, errData )
    }, [facilityCountRef])

    function gotFacilityData(data){
        setFacilityCount(data.val())
    }

    
    function gotCountData(data){
        setNoteCount(data.val())
    }
    function errData(err){
        console.log("Error!")
        console.log(err)
    }
    function opacity(){
        if(noteCount === null || facilityCount === null){
            return {opacity: '0'}
        } else {
            return {opacity: '1',  transition: 'all 1s ease',}
        }
    }
        
    const classes = useStyles();
    return ( 
    
    <Grid container 
        spacing={3}
        justify="center"
        alignItems="flex-start"
        style={opacity()}
        >

     <Grid item xs={4} className={classes.widget}>
                <Typography  variant='h3'>{facilityCount}</Typography>
                <Typography>Total Facilities</Typography>
            </Grid>
            <Grid item xs={4} className={classes.widget}>
            <Typography variant='h3'>{noteCount}</Typography>
                <Typography>Notes Written</Typography>
            </Grid>
            <Grid item xs={4} className={classes.widget}>
                <Typography variant='h3'>30+</Typography>
                <Typography>Frontliner Occupations</Typography>
        </Grid> 
        
            
    </Grid> 
    
    )
   
    
}