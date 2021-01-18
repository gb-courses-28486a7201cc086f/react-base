import { combineReducers } from "redux";
import chatReducer from "./chat";
import messageReducer from "./message";
import naviReducer from "./navi";
import profileReducer from "./profile";

export default combineReducers({
    chatReducer,
    messageReducer,
    naviReducer,
    profileReducer,
});