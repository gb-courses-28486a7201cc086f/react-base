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
    // switch chat on props change
    useEffect(() => {
        setChatId(currentChatId);
    }, [currentChatId]);
    
    // update get/add methods on each render:
    // it is normal because we rerender layout when chat 
    // has been changed
    const getMessages = () => {
        return messages.getMessages(chatId);
    }
    const addMessage = (author, text) => {
        return messages.addMessage(chatId, author, text);
    }
    
    // add chat and switch to it
    const newChat = (title) => {
        let newChatId = messages.addChat(title);
        setChatId(newChatId);
    }
    
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
            <Button color="inherit">Профиль</Button>
        </Link>
    );

    return (
        <div className="root">
            <Header 
                title={`Чат: ${titlesMap[chatId]}`}
                leftButton={backButton}
                rightButton={profileButton}
                />
            <Grid container className="content-container">
                <Grid item xs sm={4} xl={2} className="chat-list">
                    <ChatList 
                        chatId={chatId}
                        chatTitles={titlesMap}
                        chatsBaseUri={props.chatsBaseUri}
                        addChat={newChat}
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