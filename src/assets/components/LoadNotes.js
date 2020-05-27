import React from "react";
import { Typography, Grid, Paper, createMuiTheme, ThemeProvider, makeStyles } from "@material-ui/core";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

function getColor() {
    return (colorList[Math.floor(Math.random() * colorList.length)])
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },

    sticky_note: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        minHeight: "30vh",

    },
}));

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Bad Script',
        ].join(','),
    }
});


const colorList = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"]

export default function LoadNotes(props) {
    const classes = useStyles();

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const formRef = props.firebase.db.ref("formData");
    let query = formRef.orderByChild(props.type).equalTo(true).limitToLast(100)

    React.useEffect(() => {
        getNotes();
    }, [])

    function callbackStart() {
        // console.log(data.length, loading)
        if (!loading) {
            getNotes()
            // LoadNotes.getNotes()
        }
    }

    useBottomScrollListener(callbackStart);


    const cursor = new Cursor(query, props.notesLimit);
    function getNotes() {
        setLoading(true);
        query.on("value",gotData,errData);
        // cursor.next().then(ret => { gotData(ret); console.log(ret); setLoading(false); });

    }
    function errData(err) {
        console.log("Error!");
        console.log(err);
    }

    function gotData(dataIn) {
        let total = [];
        setData(Object.values(dataIn.val()).reverse());
    }



    return (
        <div>
            <Grid container className={classes.root} justify="center" alignItems="center" direction="row" spacing={2}>
                <ThemeProvider theme={theme}>
                    {data.map((notes, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3} >
                            <Paper variant="outlined" className={classes.sticky_note} style={{ backgroundColor: getColor() }}>
                                <Typography variant="body2" align="left">Dear {notes.frontliner.substring(0, notes.frontliner.length - 1)} </Typography>
                                <br />
                                <Typography variant="body2" align="left">
                                    {notes.note.replace(/^Dear[^]{0,}er([s\s]),\s?/gi, "")}
                                </Typography>
                                <br />
                                <Typography variant="body2" align="right">
                                    -From {notes.sender}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </ThemeProvider>
            </Grid>
            <Typography variant="h1" style={{ color: "#000000" }}>{console.log(loading)}</Typography>
        </div>
    )
}

class Cursor {
    constructor(baseRef, pageSize) {
        this.baseRef = baseRef;
        this.lastKey = null;
        this.lastValue = null;
        this.pageSize = pageSize;
    }

    next() {
        let ref = (this.baseRef);
        //   console.log(this.lastValue, this.lastKey, ref);
        if (this.lastValue !== null) {
            // a previous page has been loaded so get the next one using the previous value/key
            // we have to start from the current cursor so add one to page size
            try {
                ref = ref.startAt(this.lastValue,this.lastKey).limitToFirst(this.pageSize );
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            // this is the first page
            ref = ref.limitToFirst(this.pageSize);
        }

        return ref.once('value').then(snap => {
            const keys = [];
            const data = []; // store data in array so it's ordered

            snap.forEach(ss => {
                data.push(ss.val());
                keys.push(ss.key);
            });

            if (this.lastValue !== null) {
                // skip the first value, which is actually the cursor
                keys.shift();
                data.shift();
            }

            // store the last loaded record
            if (data.length) {
                const last = data.length - 1;
                this.lastKey = keys[last];
                this.lastValue = data[last].note;
            }

            return data;
        });
    }
}

function copy(mainObj) {
    let objCopy = {}; // objCopy will store a copy of the mainObj
    let key;

    for (key in mainObj) {
        objCopy[key] = mainObj[key]; // copies each property to the objCopy object
    }
    return objCopy;
}