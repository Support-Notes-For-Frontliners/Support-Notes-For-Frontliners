// import React from 'react';
// import Button from '@material-ui/core/Button';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import { makeStyles } from '@material-ui/core/styles';



// let regions = ['Seattle']

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   paper: {
//     marginRight: theme.spacing(2),
//   },
// }));

// export default function MenuListComposition() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);
//   const [region, setRegion] = React.useState(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleMenuClick = (event, index) => {
//     setRegion(regions[index]);
//     setOpen(false);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   function handleListKeyDown(event) {
//     if (event.key === 'Tab') {
//       event.preventDefault();
//       setOpen(false);
//     }
//   }

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

  

//   return (
//     <div className={classes.root}>
//       <div>
//         <Button
//           ref={anchorRef}
//           aria-controls={open ? 'menu-list-grow' : undefined}
//           aria-haspopup="true"
//           onClick={handleToggle}
//           color = "secondary"
//           variant = "outlined"
//           style ={{marginLeft: "35px"}}
//         >
//           Select a Region
//         </Button>
//         <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
//                     {regions.map((selectedRegion, index) => (
//                       <MenuItem onClick={(event) => handleMenuClick(event, index)}>{selectedRegion}</MenuItem>
//                     ))}
                    
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//       </div>
//     </div>
//   );
// }