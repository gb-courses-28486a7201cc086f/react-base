import React from "react";
import Grid from '@material-ui/core/Grid';

import { Header } from "./Header";
import { ChatList } from "./ChatList";
import { MessageContainer } from "./MessageContainer";
import { MessageStore } from "../MessageStore";

import "../styles/styles.css"

export const Layout = (props) => {
    return (
        <div className="root">
            <Header className="header"/>
            <Grid container className="content-container">
                <Grid item xs sm={4} lg={3} xl={2} className="chat-list">
                    <ChatList/>
                </Grid>
                <Grid item xs={12} sm className="message-container">
                    <MessageContainer store={new MessageStore()}/>
                </Grid>
            </Grid>
        </div>
    );
}