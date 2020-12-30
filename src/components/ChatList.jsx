import React from "react";
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Subheader from 'material-ui/Subheader';

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
 */
export const ChatList = (props) => {
    return (
        <List>
            <Subheader>Recent chats</Subheader>
            { makeChatList(props.chatTitles, props.chatId, props.chatsBaseUri) }
        </List>
    );
}