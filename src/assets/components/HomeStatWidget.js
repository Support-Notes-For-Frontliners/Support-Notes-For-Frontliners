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
    
    const [count, setCount] = React.useState(null);
    let formRef = firebase.db.ref("notes_count")
    React.useEffect(()=> {
        formRef.on("value", gotData, errData )
    }, [formRef])
    
    function gotData(data){
        setCount(data.val())
    }
    function errData(err){
        console.log("Error!")
        console.log(err)
    }
    function opacity(){
        if(count === null){
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
                <Typography  variant='h3'>6</Typography>
                <Typography>Total Facilities</Typography>
            </Grid>
            <Grid item xs={4} className={classes.widget}>
            <Typography variant='h3'>{count}</Typography>
                <Typography>Notes Written</Typography>
            </Grid>
            <Grid item xs={4} className={classes.widget}>
                <Typography variant='h3'>30+</Typography>
                <Typography>Frontliner Occupations</Typography>
        </Grid> 
        
            
    </Grid> 
    
    )
   
    
}