import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';

export const Header = (props) => {
    return (
        <AppBar position="static" className="header">
            <Toolbar className="header-toolbar">
                <Hidden smUp>
                    <IconButton edge="start" color="inherit" aria-label="chats">
                        <ArrowBackIcon/>
                    </IconButton>
                </Hidden>
                <Typography variant="h6">
                    Messages
                </Typography>
            </Toolbar>
        </AppBar>
    );
}