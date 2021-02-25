import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import RootReducer from "./root-reducer";

const middlewares = [];

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV!=='production') {
    console.log(process.env.NODE_ENV);
    middlewares.push(logger);
}

export const store = createStore(RootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

