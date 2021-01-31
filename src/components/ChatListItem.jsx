import React from "react";
import { styled } from '@material-ui/core/styles';
import Avatar from 'material-ui/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const HighlightListItem = styled(ListItem)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
});

/**
 * Item of chat list
 * 
 * @param {Object} props Component properties object 
 * @param {Object} props.chat Current chat (contains chatId, title)
 * @param {boolean} props.selected Is current chat selected
 * @param {boolean} props.highlighted Is current chat highlighted
 * @param {function(string)} props.handleNavigate Callback for item click
 * @param {function(string)} props.handleDelete Callback for item delete button click
 */
const ChatListItem = (props) => {

    const itemContent = (<>
            <ListItemAvatar>
                <Avatar src={`https://picsum.photos/seed/${props.chat.chatId}/200`} />
            </ListItemAvatar>
            <ListItemText primary={props.chat.title}/>
            <ListItemSecondaryAction>
                <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => props.handleDelete(props.chat.chatId)}
                    >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
    </>);

    if (props.highlighted) {
        return (
            <HighlightListItem
                button
                selected={props.selected}
                onClick={() => props.handleNavigate(props.chat.chatId)}
                >
                {itemContent}
            </HighlightListItem>
        );
    } 
    
    return (
        <ListItem
            button
            selected={props.selected}
            onClick={() => props.handleNavigate(props.chat.chatId)}
            >
            {itemContent}
        </ListItem>
    );

}

export default ChatListItem;