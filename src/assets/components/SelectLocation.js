import React from "react";
// import RegionSelector from './RegionSelector'
import FacilitySelector from "./FacilitySelector";
import { useSpring, animated } from "react-spring";

export default function SelectLocation(props) {
  const [localProps, updateLocalProps] = React.useState(props);

  React.useEffect(() => {
    updateLocalProps(props);
  }, [props]);

  const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

  function renderLocations() {
    // switch (localProps.locationType) {
    //     case "Health Care Workers":
    //         console.log(localProps.locationType)
    //         return <FacilitySelector jsonKey={localProps.locationType} stepperCallback = {props.stepperCallback}/>
    //     case "Grocery Store Workers":
    //         return <FacilitySelector jsonKey={localProps.locationType} stepperCallback = {props.stepperCallback}/>
    //     case "Nursing Home Workers":
    //         return <FacilitySelector jsonKey={localProps.locationType} stepperCallback = {props.stepperCallback}/>
    //     default:
    //         return <Typography>An error has occured...</Typography>
    // }
    return (
      <FacilitySelector
        elementSelected={props.elementSelected}
        jsonKey={localProps.locationType}
        stepperCallback={props.stepperCallback}
        data={props.data}
      />
    );
  }

  return (
    <animated.div style={springProps}>
      {/* <RegionSelector/> */}
      {renderLocations()}
    </animated.div>
  );
}
