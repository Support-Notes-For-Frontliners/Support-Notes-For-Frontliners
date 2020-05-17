import React from 'react';
import './App.css';
import Hero from './assets/components/Hero'
import HomeExplainer from './assets/components/HomeExplainer'
import Footer from './assets/components/Footer'
import { useSpring, animated } from 'react-spring'



function Home() {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } })
  var Scroll = require('react-scroll');
  var Element = Scroll.Element;
  var scroller = Scroll.scroller;

  function scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 1000,
      delay: 0,
      smooth: 'easeInOutQuint'
    })
  }
  
  return (
    <animated.div style={springProps}>
    <div>
    <Hero parentCallback={scrollTo}/>

    <Element name="scroll-to-element" className="element">          
        <HomeExplainer />
    </Element>
    
    <Footer/>
    </div>
    </animated.div>
  );
  
}

export default Home;

