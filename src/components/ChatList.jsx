import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { TextField } from 'material-ui';
import Avatar from 'material-ui/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Subheader from 'material-ui/Subheader';
import Button from '@material-ui/core/Button';

function makeChatList(titlesMap, currentChatId, baseUri) {
    const makeListItem = (chatId) => {
        const chatTitle = titlesMap[chatId];
        return (
            <Link 
                key={`chat_${chatId}`}
                to={`${baseUri}/${chatId}/`}
            >
                <ListItem
                    button
                    selected={chatId === currentChatId}
                >
                    <ListItemAvatar>
                        <Avatar src={`https://picsum.photos/seed/${chatId}/200`} />
                    </ListItemAvatar>
                    <ListItemText primary={chatTitle}/>
                </ListItem>
            </Link>
        );
    }

    return Object.keys(titlesMap).map(chatId => makeListItem(chatId)); 
}

/**
 * Displays chats list panel
 * 
 * @param {Object} props Component properties object
 * @param {string} props.chatId ID of current chat
 * @param {string} props.chatsBaseUri Chats URI base path 
 * @param {Object} props.chatTitles Object which contans all chat titles
 * @param {function(string)} props.addChat Callback for new chat adding
 */
export const ChatList = (props) => {
    const [text, setText] = useState("");

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleClick() {
        props.addChat(text);
        setText("");
    }
    
    return (
        <List>
            <Subheader>Активные чаты</Subheader>
            { makeChatList(props.chatTitles, props.chatId, props.chatsBaseUri) }
            <Divider/>
            <Subheader>Новый чат</Subheader>
            <ListItem>
                <TextField 
                    hintText="Имя чата"
                    value={text} 
                    onChange={handleChange}        
                />
                <Button variant="contained" onClick={handleClick}>+</Button>
            </ListItem>
        </List>
    );
}