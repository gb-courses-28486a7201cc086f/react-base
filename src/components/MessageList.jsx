import React, { useRef, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import CircularProgress from "material-ui/CircularProgress";

import { Message } from "./Message";
import { loadMessages } from "../store/actions/api";

/**
 * Displays list of messages
 * 
 * @param {Object} props Component properties object
 */
const MessageList = (props) => {
    const bottomEl = useRef(null);
    const dispatch = useDispatch();

    // get values from store
    const state = useSelector(state => {
        let chatId = state.naviReducer.currentChatId;
        return {
            me: state.profileReducer.name,
            messages: state.messageReducer[chatId], //may be undefined
            isLoading: state.naviReducer.isLoading,
        };
    }, shallowEqual);

    // load messages on first mount
    useEffect(() => dispatch(loadMessages()), []);
    
    // scroll down when messages list updated
    useEffect(() => {
        bottomEl.current.scrollIntoView({ behavior: "smooth" });
    }, [state.messages]);

    function makeMessage(msg, idx) {
        return <Message message={msg} key={`message_${idx}`} me={state.me}/>
    }

    let messages = <></>;
    if (state.isLoading) {
        messages = <CircularProgress/>;
    } else if (state.messages !== undefined) {
        messages = state.messages.map(makeMessage);
    }

    return (
        <div className="message-field">
            {messages}
            <div ref={bottomEl}></div>
        </div>
    );
};

export default MessageList;