import React from "react";
import Grid from '@material-ui/core/Grid';

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
    // chat title for header panel
    const currentChatTitle = titlesMap[currentChatId];
    // get/add methods for message list 
    const getMessages = () => {
        return messages.getMessages(currentChatId);
    }
    const addMessage = (author, text) => {
        return messages.addMessage(currentChatId, author, text);
    } 
    
    // switch between chats list and messages on xs screens
    //const

    return (
        <div className="root">
            <Header 
                chatTitle={currentChatTitle}
                className="header"
                />
            <Grid container className="content-container">
                <Grid item xs={true} sm={4} lg={3} xl={2} className="chat-list">
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