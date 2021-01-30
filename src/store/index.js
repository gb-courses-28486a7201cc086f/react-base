import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import middlewares from "../middlewares";

export default function initStore() {
    return createStore(
        reducers,
        compose(
            applyMiddleware(...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
    );
}
