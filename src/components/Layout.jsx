import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';

import { Header } from "./Header";
import { ChatList } from "./ChatList";
import { MessageContainer } from "./MessageContainer";
import { MessageStore } from "../MessageStore";

import "../styles/styles.css"

const messages = new MessageStore();
// display first available chat by default
const defaultChatId = Object.keys(messages.getChatTitles())[0];
// get/add methods for message list 
let getMessages = () => {
    return messages.getMessages(defaultChatId);
}
let addMessage = (author, text) => {
    return messages.addMessage(defaultChatId, author, text);
} 

/**
 * Top-level component, which contains header, chat list and message area
 * @param {Object} props Component properties object
 * @param {string} props.chatId ID of current chat
 * @param {string} props.chatsBaseUri Chats URI base path 
 */
export const Layout = (props) => {
    const currentChatId = props.chatId === undefined? defaultChatId : props.chatId;
    const titlesMap = messages.getChatTitles();
    
    const [chatId, setChatId] = useState(currentChatId);
    // update get/add methods when chat changed
    useEffect(() => {
        getMessages = () => {
            return messages.getMessages(currentChatId);
        }
        addMessage = (author, text) => {
            return messages.addMessage(currentChatId, author, text);
        }
        setChatId(currentChatId);
    }, [currentChatId]);
    
    // TODO switch to chat list on xs screens
    const backButton = (
        <Hidden smUp>
            <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="chats"
                >
                <ArrowBackIcon/>
            </IconButton>
        </Hidden>
    );

    const profileButton = (
        <Link to={`${props.profileUri}`}>
            <Button color="inherit">Profile</Button>
        </Link>
    );

    return (
        <div className="root">
            <Header 
                title={`Chat: ${titlesMap[chatId]}`}
                leftButton={backButton}
                rightButton={profileButton}
                />
            <Grid container className="content-container">
                <Grid item xs sm={4} xl={2} className="chat-list">
                    <ChatList 
                        chatTitles={titlesMap}
                        chatsBaseUri={props.chatsBaseUri}
                        />
                </Grid>
                <Grid item xs={12} sm className="message-container">
                    <MessageContainer 
                        getMessages={getMessages}
                        addMessage={addMessage}
                        />
                </Grid>
            </Grid>
        </div>
    );
}