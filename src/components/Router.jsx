import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Layout } from './Layout';

const chatsBase = "/chats";

/**
 * Appication router
 */
export const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" render={ 
                () => <Layout chatsBaseUri={chatsBase}/>
            }/>
            <Route path={`${chatsBase}/:chatId/`} render={ 
                (props) => (<Layout 
                                chatsBaseUri={chatsBase}
                                chatId={props.match.params.chatId}
                                />) 
            }/>
        </Switch>
    );
}