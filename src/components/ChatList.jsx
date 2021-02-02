import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import connect from  "react-redux/es/connect/connect";
import { push } from "connected-react-router";
import { TextField } from 'material-ui';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Subheader from 'material-ui/Subheader';
import Button from '@material-ui/core/Button';

import ChatListItem from "./ChatListItem";
import { addChat, delChat } from "../store/actions/chat";
import { blinkChat } from "../store/actions/navi";

const blinkTimeout = 200; //milliseconds

/**
 * Displays chats list panel
 * 
 * @param {Object} props Component properties object
 * @param {string} props.chats (redux) Object which contains chats data
 * @param {string} props.chatsBase (redux) Base URI path for chats
 * @param {string} props.currentChatId (redux) ID of selected chat
 * @param {string} props.blinkChatId (redux) ID of chat which has some event occurred
 * @param {function(string)} props.addChat (redux action) Callback for new chat adding
 * @param {function(string)} props.delChat (redux action) Callback for chat deleting
 * @param {function(string)} props.blinkChat (redux action) Callback for chat highlighting
 * @param {function(string)} props.push (redux action) Callback for switch route
 */
const ChatList = (props) => {
    const getChatPath = (id) => `${props.chatsBase}/${id}/`;
    
    const [text, setText] = useState("");

    // blink chat effect
    useEffect(() => {
        // cancel chat highlighting:
        // set id to null -> none will be selected
        if (props.blinkChatId !== null) {
            setTimeout(() => {
                props.blinkChat(null);
            }, blinkTimeout);
        }
    }, [props.blinkChatId]);

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleKeyUp(e) {
        // send on enter
        if (e.keyCode === 13) {
            props.addChat(text);
            setText("");
        }
    }

    function handleClick() {
        props.addChat(text);
        setText("");
    }

    function handleNavigate(chatId) {
        props.push(getChatPath(chatId));
    }

    function handleDelete(chatId) {
        props.delChat(chatId);
    }

    const listItems = props.chats.map((chat) => {
        return (
            <ChatListItem 
                chat={chat} 
                selected={chat.chatId === props.currentChatId}
                highlighted={chat.chatId === props.blinkChatId? true : false}
                handleNavigate={handleNavigate}
                handleDelete={handleDelete}
                key={`chat_${chat.chatId}`}
                >
            </ChatListItem>
        );
    });
    
    return (
        <List>
            <Subheader>Активные чаты</Subheader>
            { listItems }
            <Divider/>
            <Subheader>Новый чат</Subheader>
            <ListItem style={{flexDirection: "column"}}>
                <TextField 
                    fullWidth={true}
                    hintText="Имя чата"
                    value={text} 
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}      
                    />
                <Button
                    variant="outlined" 
                    color="primary"
                    onClick={handleClick}
                    >добавить
                </Button>
            </ListItem>
        </List>
    );
}

const mapStateToProps = ({chatReducer, naviReducer}) => ({
    chats: chatReducer,
    chatsBase: naviReducer.chatsBase,
    currentChatId: naviReducer.currentChatId,
    blinkChatId: naviReducer.blinkChatId, // blink chat events
});

const mapDispatchToProps = dispatch => bindActionCreators({addChat, delChat, blinkChat, push}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);