import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Layout } from './Layout';
import { Profile } from './Profile';

const chatsBase = "/chats";
const profilePath = "/profile/";

/**
 * Appication router
 */
export const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" render={ 
                () => <Layout 
                        chatsBaseUri={chatsBase}
                        profileUri={profilePath}
                        />
            }/>
            <Route exact path={`${chatsBase}/:chatId/`} render={ 
                (props) => (<Layout 
                                chatsBaseUri={chatsBase}
                                profileUri={profilePath}
                                chatId={props.match.params.chatId}
                                />) 
            }/>
            <Route exact path={profilePath} component={Profile} />
        </Switch>
    );
}