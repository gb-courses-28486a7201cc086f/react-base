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

function makeChatList(titlesMap, currentChat) {
    const makeListItem = (chat, idx) => {
        const chatTitle = titlesMap[chat];
        return (
            <Link 
                key={`chat_${idx}`}
                to={`${chat}`}
                >
                <ListItem
                    button
                    selected={chat === currentChat}
                    >
                    <ListItemAvatar>
                        <Avatar src={`https://picsum.photos/seed/${idx}/200`} />
                    </ListItemAvatar>
                    <ListItemText primary={chatTitle}/>
                </ListItem>
            </Link>
        );
    }

    return Object.keys(titlesMap).map((chat, idx) => makeListItem(chat, idx)); 
}

/**
 * Displays chats list panel
 * 
 * @param {Object} props Component properties object
 * @param {string} props.chatPath URI path of current chat
 * @param {Object} props.chatTitles Object which contans all chat titles (path as key)
 * @param {function(string)} props.addChat Callback for new chat adding
 */
export const ChatList = (props) => {
    const [text, setText] = useState("");

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
    
    return (
        <List>
            <Subheader>Активные чаты</Subheader>
            { makeChatList(props.chatTitles, props.chatPath) }
            <Divider/>
            <Subheader>Новый чат</Subheader>
            <ListItem>
                <TextField 
                    hintText="Имя чата"
                    value={text} 
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}      
                    />
                <Button variant="contained" onClick={handleClick}>+</Button>
            </ListItem>
        </List>
    );
}