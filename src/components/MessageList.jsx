import React, { useRef, useEffect } from "react";
import { bindActionCreators } from "redux";
import connect from  "react-redux/es/connect/connect";

import { Message } from "./Message";
import { sendMessage } from "../store/actions/message";

const messageBot = {
    name: "bot",
    answerText: "Не приставай ко мне, я робот!",
    delay: 1000,
    getWelcome: function(name) {
        return [
            {author: this.name, text: `Привет, я ${name}!`},
            {author: this.name, text: "Как дела?"}
        ];
    },
};

/**
 * Displays list of messages
 * 
 * @param {Object} props Component properties object
 * @param {Array} props.messages (redux) Collection of messages
 * @param {string} props.me (redux) Name of current user
 */
const MessageList = (props) => {
    const bottomEl = useRef(null);
    
    // chat bot effect
    useEffect(() => {
        let {currentChatId:chatId, currentChatTitle:chatTitle, messages} = props;
        // send welcome from bot:
        // chatId is not null -> concrete chat selected,
        // messages is undefined -> it is new chat
        if (chatId !== null && messages === undefined) {
            let welcome = messageBot.getWelcome(chatTitle);
            welcome.map(({author, text}) => {
                props.sendMessage(chatId, author, text);
            })
        }
        // answer to user message:
        // chat should be selected and has any message
        if (chatId !== null && messages !== undefined && messages.length > 0) {
            let lastMessage = messages[messages.length - 1];
            // last message is not from bot -> should answer
            if (lastMessage.author !== messageBot.name) {
                setTimeout(() => {
                    props.sendMessage(chatId, messageBot.name, messageBot.answerText);
                }, messageBot.delay);
            }
        }
    }, [props.messages, props.currentChatId, props.currentChatTitle]);

    // scroll down when messages list updated
    useEffect(() => {
        bottomEl.current.scrollIntoView({ behavior: "smooth" });
    }, [props.messages]);

    function makeMessage(msg, idx) {
        return <Message message={msg} key={`message_${idx}`} me={props.me}/>
    }

    let messages = <></>;
    if (props.messages !== undefined) {
        messages = props.messages.map(makeMessage);
    }

    return (
        <div className="message-field">
            {messages}
            <div ref={bottomEl}></div>
        </div>
    );
};

const mapStateToProps = ({chatReducer, messageReducer, naviReducer, profileReducer}) => {
    let chatId = naviReducer.currentChatId;
    let selectedChat = chatReducer.filter((c) => c.chatId === chatId)[0];
    let chatTitle = selectedChat === undefined? null : selectedChat.title;
    return {
        me: profileReducer.name,
        messages: messageReducer[chatId], //may be undefined
        currentChatTitle: chatTitle,
        currentChatId: chatId,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({sendMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);