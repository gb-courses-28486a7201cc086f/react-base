import React, { useRef, useEffect } from "react";
import { bindActionCreators } from "redux";
import connect from  "react-redux/es/connect/connect";

import { Message } from "./Message";
import { sendMessage } from "../store/actions/message";

/**
 * Displays list of messages
 * 
 * @param {Object} props Component properties object
 * @param {Array} props.messages (redux) Collection of messages
 * @param {string} props.me (redux) Name of current user
 */
const MessageList = (props) => {
    const bottomEl = useRef(null);
    
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
    return {
        me: profileReducer.name,
        messages: messageReducer[chatId], //may be undefined
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({sendMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);