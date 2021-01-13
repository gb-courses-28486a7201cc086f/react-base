import React from "react";
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const chats = ["Brendan Lim", "Eric Hoffman", "Grace Ng", "Kerem Suer", "Raquel Parrado"];

function getChatList() {
    return chats.map((chat, idx) => {
        return (
            <ListItem
                primaryText={chat}
                leftAvatar={<Avatar src={`https://picsum.photos/seed/${idx}/200`} />}
                rightIcon={<CommunicationChatBubble />}
            />
        );
    }); 
}

export const ChatList = (props) => {
    return (
        <div className="chat-list">
            <List>
                <Subheader>Recent chats</Subheader>
                { getChatList() }
            </List>
        </div>
    );
}