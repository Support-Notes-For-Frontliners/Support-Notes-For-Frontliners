import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import location_list from '../data/location_list.json'
import Grid from '@material-ui/core/Grid';




const useStyles = makeStyles({
    root: {
        maxWidth: 345,
       
    },
    rootSelected: {
        maxWidth: 345,
        backgroundColor: "#C8E8EA"
    },
    rootEmphasized: {
        maxWidth: 345,
        boxShadow: "2px 2px 33px 9px rgba(62,197,207,1)",
        WebkitAnimation: "breathing 7s ease-out"

    },
    media: {
        height: 140,
    },
    grid: {
        flexGrow: 1,
    },
});


export default function FacilitySelector({stepperCallback, jsonKey, elementSelected}) {

    const[itemSelected, setItemSelected] = React.useState(false);

    const classes = useStyles();

    React.useEffect(()=>{
        if(elementSelected){
            setItemSelected(true)
        }
    },[elementSelected])

    function handleInput(e){
        e.preventDefault();
        stepperCallback(e.currentTarget.id)
        setItemSelected(true);
        // console.log(e.currentTarget.id);
    }

    return (
        <Grid container className={classes.grid} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing="3">
                    <React.Fragment>
                        {location_list[jsonKey].map((selectedHospital, index) => (
                            <Grid  key={selectedHospital.name} item>
                                <Card id={selectedHospital.name} className={elementSelected === selectedHospital.name ? classes.rootSelected
                                : selectedHospital["emphasis"] && !itemSelected ? classes.rootEmphasized : classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            alt="increase priority"
                                            className={classes.media}
                                            image={selectedHospital.img}
                                            // image="/images/overlake.jpg"
                                            title={selectedHospital.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {selectedHospital.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {selectedHospital.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button onClick={handleInput} id={selectedHospital.name} size="small" color="primary">
                                            Select
                                        </Button>
                                        {/* <Button size="small" color="primary">
                                            Learn More
                                        </Button> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </React.Fragment>
                </Grid>
            </Grid>
        </Grid>
    );
}