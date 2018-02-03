import { combineReducers } from "redux";
import socket              from './socket';
import table               from "./table";

export default combineReducers({
    table,
    socket,
})