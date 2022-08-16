/* eslint-disable no-unused-vars */

import firebase from "../../config/firebase";

export const Loading=(loader)=>dispatch=>{
    dispatch({
        type: 'AUTH_LOADING',
        payload: loader
    });
}

export const register = (crads,password,history) => async dispatch => {
    await  dispatch(Loading(true))
    // console.log(crads);
    firebase.auth().createUserWithEmailAndPassword(crads.email, password).then((userCredential) => {
        var user = userCredential.user;
        firebase.firestore().collection('user').doc(user.uid)
        .set(crads)
        .then((data)=>{
            alert('Register Successfully!')
            dispatch(Loading(false))
            history.push("/auth/")
        })
        
})
    .catch((error) => {
        alert(error.message)
        dispatch(Loading(false))
});
}

export const login = (crads) => async dispatch => {
    await  dispatch(Loading(true))
    // console.log(crads.email+" & "+crads.password);
    firebase.auth().signInWithEmailAndPassword(crads.email, crads.password).then((userCredential) => {
        var user = userCredential.user;
        firebase.firestore().collection('user').doc(user.uid).onSnapshot(doc =>{
            var tempUser = {};						
            tempUser = {id: doc.id, ...doc.data() };
            dispatch({
                type:"AUTH_LOGIN",
                payload:{
                    user:tempUser
                }
            });
            dispatch(Loading(false))
        })
    })
    .catch((error) => {
        alert(error.message)
        dispatch(Loading(false))
    });
}

export const logout = (crads) => async dispatch => {
    localStorage.clear();
    firebase.auth().signOut().then(data => {
        dispatch({
            type: "LOGOUT_SUCCESS",
            uid: '',
            error: '',
        });
    }).catch(error => {
        dispatch({
            type: "LOGOUT_FAIL",
            uid: '',
            error: error,
        });
    });
}