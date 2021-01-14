import React from "react";
import { Link, useHistory } from 'react-router-dom';
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
    const makeChatPath = (id) =>  `${props.chatsBaseUri}/${id}`;
    const history = useHistory();

    // shitch to default chat if not selected
    if (props.chatId === undefined) {
        history.push(makeChatPath(defaultChatId));
        return <></>;
    }

    const currentChatId = props.chatId;
    const currentPath = makeChatPath(currentChatId);
    const titlesMap = messages.getChatTitles();

    // create new map with uri paths as keys (instead of ids)
    // to use in ChatList component
    let pathMap = {};
    for (let id in titlesMap) {
        pathMap[makeChatPath(id)] = titlesMap[id];
    }
    
    // update get/add message methods and rerender
    const getMessages = () => {
        return messages.getMessages(currentChatId);
    }
    const addMessage = (author, text) => {
        return messages.addMessage(currentChatId, author, text);
    }
    
    // add chat and switch to it
    const newChat = (title) => {
        let newChatId = messages.addChat(title);
        history.push(makeChatPath(newChatId));
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
                title={`Чат: ${titlesMap[currentChatId]}`}
                leftButton={backButton}
                rightButton={profileButton}
                />
            <Grid container className="content-container">
                <Grid item xs sm={4} xl={2} className="chat-list">
                    <ChatList 
                        chatPath={currentPath}
                        chatTitles={pathMap}
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