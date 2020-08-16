import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Container, Typography, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { useTheme, withStyles } from '@material-ui/core/styles'
import Note from './HomepageNote'
import Arrow from './SliderButton'
import StyledTypography from '../StyledTypography';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import NoteData from "../../data/homepagenote_data.json";

// style for cards
const cardStyle = {
    width: 32,
    height: 40,
    wordPad: 3,
    backPad: 4,
}
const cardColors = ["#fd9ba3","#fedac3","#b7ead7","#feb7b3","#c8cfe9","#e2f0cd"]

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const styles = (theme) => ({
    "html":{
        scrollBehavior:"smooth",
    },
    root:{
        backgroundColor:"#E1F3F4",
    },
    slider:{
        flexWrap:"nowrap",
        // overflow:"hidden",
        overflow:'scroll',
        scrollBehavior:"smooth",

        "&::-webkit-scrollbar":{
            display:"none",
        },
    },
    arrow:{
        position:"relative",
        top:theme.spacing(-0.5*(cardStyle.height+cardStyle.wordPad*2+cardStyle.backPad+10)),
        display:"inline-block",
        cursor:"pointer",
    },
    sliderStart:{
        height:"100%",
    },
})

const themeTypo = createMuiTheme({
    typography: {
        fontFamily: [
            'Bad Script',
        ].join(','),
    }
});

function Slider(props){
    // style for moi
    const classes=(props.classes)
    const theme = useTheme()

    const widthDivisor = 10;
    
    const arrSum = arr => arr.reduce((a,b) => a + b, 0)
    const averageCardWidth = arrSum(NoteData.map(item => item.body.length/widthDivisor))/NoteData.length
    const totalCardPxWidth = theme.spacing(averageCardWidth+cardStyle.wordPad*2+cardStyle.backPad) + 40

    const contentWidth = theme.breakpoints.values.lg

    // check for window resize
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    React.useEffect(() => {
        function resizeListener(){
            setWindowWidth(window.innerWidth)
            
        }
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])
    
    const minOffset = Math.max((windowWidth - contentWidth) /2, 0) // max scroll to left
    const maxOffset = -1 * NoteData.length * totalCardPxWidth + windowWidth // this is max scroll to right
    // console.log("min " + minOffset)
    // console.log("max " + maxOffset)

    // control cards movement, start with min
    const [offset, setOffset] = React.useState(-minOffset)
    

    // find an integer number of card widths to move. at least try to move one card width
    const slideDist = Math.max( Math.ceil(( Math.floor(windowWidth/totalCardPxWidth/2)) * totalCardPxWidth), totalCardPxWidth )
    // console.log("dist" + slideDist)
    // console.log("offset" + offset)

    const sliderRef = React.useRef()
    const sliderPosRef = React.useRef()
    
    const [isGridHovered, setIsGridHovered] = React.useState(false)
    const [isRightButtonHovered, setIsRightButtonHovered] = React.useState(false)
    const [isLeftButtonHovered, setIsLeftButtonHovered] = React.useState(false)

    function handleClick(direction){
        const currentPos = -ReactDOM.findDOMNode(sliderPosRef.current).getBoundingClientRect().x
        // console.log("current "+currentPos)

        var scrollTo = currentPos
        if (direction === "right"){
            scrollTo = currentPos + minOffset + slideDist - currentPos%totalCardPxWidth
        }
        else if (direction === "left"){
            scrollTo = currentPos + minOffset - slideDist - currentPos%totalCardPxWidth
        }

        scrollTo = Math.min( Math.max(scrollTo, -minOffset), -maxOffset+minOffset)
        ReactDOM.findDOMNode(sliderRef.current).scrollTo(scrollTo,0)
        setOffset(scrollTo)
        // console.log("scroll to "+(scrollTo))
    }
    function handleClickRight(){
        handleClick("right")
    }
    function handleClickLeft(){
        handleClick("left")
        
    }
    
    const disabledLeft = (offset === -minOffset)
    const disabledRight = (offset === -maxOffset+minOffset)
    const arrowOffsetLeft = {left: isMobile? "20px" : (0.25*windowWidth) + "px"} 
    const arrowOffsetRight = {left:isMobile? (windowWidth-120) + "px" : 0.75*(windowWidth-120) + "px"}
    const isDisplayButtons = (isMobile || (isGridHovered || isRightButtonHovered || isLeftButtonHovered))

    return (
        <div className={classes.root} onMouseOver={()=>setIsGridHovered(true)} onMouseLeave={()=>setTimeout(()=>{setIsGridHovered(false)}, 50)} >
            <Container>
                <div style={{display:"inline-block", marginTop:"30px"}}>
                    <StyledTypography color="inherit" variant={"h4"} marked="center" >
                        <div style={{textAlign:"center"}}>
                        Notes From Around the World
                        </div>
                        
                    </StyledTypography>
                </div>
                <Typography className = {classes.links}  variant="p" style= {{textDecoration: "underline", float:"right", marginTop: (window.innerWidth>537 ? "70px": "10px"), fontWeight: "400" }}>
                    <Link underline="none" component={RouterLink} to="/note-gallery"  style={{color: "black"}}> 
                    View All
                    </Link>
                </Typography>
            </Container>
            <Grid container spacing={0} className={classes.slider} ref={sliderRef} style={{paddingBottom:(!isDisplayButtons?"40px":"0px")}}>
                <ThemeProvider theme={themeTypo}>
                    <Grid item>
                        <div ref={sliderPosRef} className={classes.sliderStart} style={{marginLeft:minOffset}}></div>
                    </Grid>
                    {NoteData.map((datapoint, index) =>{
                        return(
                            <Grid item key={"homepagenote"+index}>
                                <Note header={datapoint.header} body={datapoint.body} sender={datapoint.sender} theme={theme} style={{...cardStyle,width:(datapoint.body.length/widthDivisor),backColor:cardColors[index%cardColors.length]}} data={datapoint} index={index} />
                            </Grid>
                            )
                        })
                    }
                </ThemeProvider>
            </Grid>
    {/* whether or not to display slider arrow buttons */}
            {isDisplayButtons &&
                <div>
                    <div className={`${classes.arrow} ${classes.arrowLeft}`} style={arrowOffsetLeft}  >
                        <Arrow direction={"left"} 
                            disabled={disabledLeft} 
                            width={"40px"} 
                            onClick={handleClickLeft} 
                            onMouseOver={()=>setIsLeftButtonHovered(true)} 
                            onMouseOut={()=>setIsLeftButtonHovered(false)} 
                        />  
                    </div>
                    <div className={`${classes.arrow} ${classes.arrowRight}`} style={arrowOffsetRight}  >
                        <Arrow direction={"right"} 
                            disabled={disabledRight} 
                            width={"40px"} 
                            onClick={handleClickRight} 
                            onMouseOver={()=>{setIsRightButtonHovered(true)}} 
                            onMouseOut={()=>setIsRightButtonHovered(false)} 
                        />
                    </div>
                </div>
            }
            
        </div>
        
    )
}

export default withStyles(styles)(Slider)