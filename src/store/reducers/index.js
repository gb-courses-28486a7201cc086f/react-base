import { combineReducers } from "redux";
import { connectRouter  } from "connected-react-router";
import chatReducer from "./chat";
import messageReducer from "./message";
import naviReducer from "./navi";
import profileReducer from "./profile";

export default (history) => combineReducers({
    router: connectRouter(history),
    chatReducer,
    messageReducer,
    naviReducer,
    profileReducer,
});