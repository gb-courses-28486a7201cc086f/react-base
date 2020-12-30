import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';

/**
 * Displays header panel
 * 
 * @param {Object} props Component properties object
 * @param {string} props.chatId ID of current chat
 * @param {Object} props.store Object which stores chats
 * @param {function(string, string, string): any} props.store.getChatTitles 
 */
export const Header = (props) => {
    const titlesMap = props.store.getChatTitles();
    const currentChatTitle = titlesMap[props.chatId];

    return (
        <AppBar position="static" className="header">
            <Toolbar className="header-toolbar">
                <Hidden smUp>
                    <IconButton edge="start" color="inherit" aria-label="chats">
                        <ArrowBackIcon/>
                    </IconButton>
                </Hidden>
                <Typography variant="h6">
                    Chat: {currentChatTitle}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}