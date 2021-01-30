import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import connect from  "react-redux/es/connect/connect";
import { push } from "connected-react-router";
import { Link } from 'react-router-dom';
import { TextField } from 'material-ui';
import { styled } from '@material-ui/core/styles';
import Avatar from 'material-ui/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Subheader from 'material-ui/Subheader';
import Button from '@material-ui/core/Button';

import { addChat } from "../store/actions/chat";
import { blinkChat } from "../store/actions/navi";

const blinkTimeout = 200; //milliseconds

const BlinkListItem = styled(ListItem)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
});

function makeChatList(titlesMap, currentChat, blinkChat, handleNavigate) {
    const makeListItem = (chat, idx) => {
        const chatTitle = titlesMap[chat];
        const itemContent = (<>
                <ListItemAvatar>
                    <Avatar src={`https://picsum.photos/seed/${idx}/200`} />
                </ListItemAvatar>
                <ListItemText primary={chatTitle}/>
        </>);

        if (chat === blinkChat) {
            return (
                <BlinkListItem
                    button
                    selected={chat === currentChat}
                    onClick={() => handleNavigate(chat)}
                    key={`chat_${idx}`}
                    >
                    {itemContent}
                </BlinkListItem>
            );
        } 
        
        return (
            <ListItem
                button
                selected={chat === currentChat}
                onClick={() => handleNavigate(chat)}
                key={`chat_${idx}`}
                >
                {itemContent}
            </ListItem>
        );
    }

    return Object.keys(titlesMap).map((chat, idx) => makeListItem(chat, idx)); 
}

/**
 * Displays chats list panel
 * 
 * @param {Object} props Component properties object
 * @param {string} props.chats (redux) Object which contains chats data
 * @param {Object} props.chatsBase (redux) Base URI path for chats
 * @param {string} props.currentChatId (redux) ID of selected chat
 * @param {string} props.blinkChatId (redux) ID of chat which has some event occurred
 * @param {function(string)} props.addChat (redux action) Callback for new chat adding
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

    function handleNavigate(link) {
        props.push(link);
    }

    const currentChatPath = getChatPath(props.currentChatId);
    const blinkChatPath = getChatPath(props.blinkChatId);
    const chatPathtoTitles = {};
    for (let item of props.chats) {
        chatPathtoTitles[getChatPath(item.chatId)] = item.title;
    }
    
    return (
        <List>
            <Subheader>Активные чаты</Subheader>
            { makeChatList(chatPathtoTitles, currentChatPath, blinkChatPath, handleNavigate) }
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

const mapDispatchToProps = dispatch => bindActionCreators({addChat, blinkChat, push}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);