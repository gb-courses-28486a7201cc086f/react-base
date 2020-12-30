import React from "react";
import Avatar from 'material-ui/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Subheader from 'material-ui/Subheader';

function makeChatList(titles, currentTitle) {
    return titles.map((title, idx) => {
        return (
            <ListItem
                button
                key={`chat_${idx}`}
                selected={title === currentTitle}
            >
                <ListItemAvatar>
                    <Avatar src={`https://picsum.photos/seed/${idx}/200`} />
                </ListItemAvatar>
                <ListItemText primary={title}/>
            </ListItem>
        );
    }); 
}

/**
 * Displays chats list panel
 * 
 * @param {Object} props Component properties object
 * @param {string} props.chatId ID of current chat
 * @param {Object} props.store Object which stores chats
 * @param {function(string, string, string): any} props.store.getChatTitles 
 * @param {function(string): Array} props.store.addChat 
 */
export const ChatList = (props) => {
    const titlesMap = props.store.getChatTitles();
    const currentTitle = titlesMap[props.chatId];
    const titles = Object.values(titlesMap);
    
    console.log(titlesMap);
    console.log(currentTitle);
    console.log(titles);

    return (
        <List>
            <Subheader>Recent chats</Subheader>
            { makeChatList(titles, currentTitle) }
        </List>
    );
}