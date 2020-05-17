import React from 'react';
import './App.css';
import Hero from './assets/components/Hero'
import HomeExplainer from './assets/components/HomeExplainer'
import Footer from './assets/components/Footer'
import { useSpring, animated } from 'react-spring'



function Home() {
  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } })

  return (
    <animated.div style={springProps}>
    <div>
    <Hero />

    <div id="instructions">
          <HomeExplainer />
    </div>
    
    <Footer/>
    </div>
    </animated.div>
  );
  
}

export default Home;

