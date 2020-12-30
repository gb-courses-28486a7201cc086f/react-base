import React from "react";
import Grid from '@material-ui/core/Grid';

import { Header } from "./Header";
import { ChatList } from "./ChatList";
import { MessageContainer } from "./MessageContainer";
import { MessageStore } from "../MessageStore";

import "../styles/styles.css"

const messages = new MessageStore()

/**
 * Top-level component, which contains header, chat list and message area
 * @param {Object} props Component properties object
 * @param {string} props.chatId ID of current chat
 */
export const Layout = (props) => {
    return (
        <div className="root">
            <Header className="header"/>
            <Grid container className="content-container">
                <Grid item xs sm={4} lg={3} xl={2} className="chat-list">
                    <ChatList/>
                </Grid>
                <Grid item xs={12} sm className="message-container">
                    <MessageContainer store={messages} chatId={props.chatId}/>
                </Grid>
            </Grid>
        </div>
    );
}