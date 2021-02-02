import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Hidden from '@material-ui/core/Hidden';

import { Header } from "./Header";
import ChatList from "./ChatList";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import { changeChat } from "../store/actions/navi";
import { loadProfile } from "../store/actions/api";

/**
 * Top-level component, which contains header, chat list and message area
 * @param {Object} props Component properties object
 * @param {string} props.chatId ID of chat to render. may be undefined
 */
const Layout = (props) => {
    const state = useSelector(state => ({
        navi: state.naviReducer,
        chats: state.chatReducer,
        profile: state.profileReducer,
    }), shallowEqual);

    const dispatch = useDispatch();

    // check if selected chat exists
    let actualChatId, actualChatTitle;
    let selectedChats = state.chats.filter((c) => c.chatId === props.chatId);
    if (selectedChats.length != 0) {
        // chat exists
        actualChatId = props.chatId;
        actualChatTitle = selectedChats[0].title
    }

    // load profile data from api on first mount
    useEffect(() => dispatch(loadProfile()), []);

    // set up new chatId in redux store
    useEffect(() => {
        if (actualChatId !== undefined) {
            dispatch(changeChat(actualChatId));
        }
    }, [actualChatId]);
    
    // switch to chat list on xs screensactualChatTitle
    const backButton = (
        <Hidden smUp>
            <Link to={"/"}>
                <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="chats"
                    >
                    <ArrowBackIcon/>
                </IconButton>
            </Link>
        </Hidden>
    );

    const profileButton = (
        <Link to={`${state.navi.profilePath}`}>
            <Button color="inherit">
                {`${state.profile.name}`}
                <AccountCircle/>
            </Button>
        </Link>
    );

    // until chat not selected render
    // chat list and empty message field
    if (actualChatId === undefined) {
        return (
            <div className="root">
                <Header 
                    title={`Выберите чат:`}
                    rightButton={profileButton}
                    />
                <Grid container className="content-container">
                    <Grid item xs={12} sm={4} xl={2} className="chat-list">
                        <ChatList/>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item sm className="message-container">
                            <MessageList/>
                        </Grid>
                    </Hidden>
                </Grid>
            </div>
        );
    }

    return (
        <div className="root">
            <Header 
                title={`Чат: ${actualChatTitle}`}
                leftButton={backButton}
                rightButton={profileButton}
                />
            <Grid container className="content-container">
                <Grid item xs sm={4} xl={2} className="chat-list">
                    <ChatList/>
                </Grid>
                <Grid item xs={12} sm className="message-container">
                    <MessageList/>
                    <SendMessageForm/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Layout;