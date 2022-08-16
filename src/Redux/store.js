import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from './reducer/rootReducer';
import thunk from "redux-thunk";
import CryptoJS from "crypto-js";

let mode = "DEVELOPMENT";
const saveToLocalStorage = state => {
    let serializedUid = "";
    if (mode !== "DEVELOPMENT") {
        serializedUid = CryptoJS.AES.encrypt(
        JSON.stringify(state.authUser),
        "my-secret-key"
    ).toString();
} else {
    serializedUid = JSON.stringify(state.authUser);
}
localStorage.setItem("authUser", serializedUid);
};
const checkLocalStorage = () => {
const serializedUid = localStorage.getItem("authUser");
if (serializedUid === null) return undefined;
    let authUser = "";
if (mode !== "DEVELOPMENT") {
    authUser = JSON.parse(
    CryptoJS.AES.decrypt(serializedUid, "my-secret-key").toString(
    CryptoJS.enc.Utf8
    )
);
} else authUser = JSON.parse(serializedUid);
    return { authUser };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
rootReducer,
checkLocalStorage(),
composeEnhancers(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
