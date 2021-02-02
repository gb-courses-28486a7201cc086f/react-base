import { SUCCESS_PROFILE_LOADING } from "../actions/api"

const initialState = {}

export default function profileReducer(store=initialState, action) {
    switch (action.type) {
        case SUCCESS_PROFILE_LOADING:
            return {
                ...store,
                name: action.payload.name,
            };
        
        default:
            return store;
    }
}