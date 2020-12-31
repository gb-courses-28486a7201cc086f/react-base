import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

/**
 * Displays header panel
 * 
 * @param {Object} props Component properties object
 * @param {*} props.leftButton JSX Element to display before title
 * @param {string} props.title Title of current page
 * @param {*} props.rightButton JSX Element to display before title
 */
export const Header = (props) => {
    const leftButton = props.leftButton === undefined? <></> : props.leftButton;
    const rightButton = props.rightButton === undefined? <></> : props.rightButton;
    const title = props.title === undefined? "Title" : props.title;
    return (
        <AppBar position="static" className="header">
            <Toolbar className="header-toolbar">
                {leftButton}
                <Typography variant="h6" style={{flexGrow: 1}}>
                    {title}
                </Typography>
                {rightButton}
            </Toolbar>
        </AppBar>
    );
}