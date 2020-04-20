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
import { animateScroll as scroll} from 'react-scroll'



const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    grid: {
        flexGrow: 1,
    },
});


export default function FacilitySelector({stepperCallback, jsonKey}) {

    scroll.scrollTo(0);

    const classes = useStyles();

    function handleInput(e){
        e.preventDefault();
        stepperCallback(e.currentTarget.id)
        // console.log(e.currentTarget.id);
    }

    return (
        <Grid container className={classes.grid} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing="3">
                    <React.Fragment>
                        {location_list[jsonKey].map((selectedHospital, index) => (
                            <Grid key={selectedHospital.name} item>
                                <Card className={classes.root}>
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