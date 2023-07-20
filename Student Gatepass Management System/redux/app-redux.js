import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';

//
// Initial State...
//
const initialState = {
    currentUser: "",
    posts: []
};

//
// Reducer...
//

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case "setCurrentUser": 
            return { ...state, currentUser: action.value };

        case "setPosts": 
            return { ...state, posts: action.value };

        default: 
            return state;
    }
};

//
// Store...
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export { store };

//
// Action Creators...
//

const setCurrentUser = (currentUser) => {
    return {
        type: "setCurrentUser",
        value: currentUser,
    };
}

const setPosts = (posts) => {
    return {
        type: "setPosts",
        value: posts,
    };
}

const fetchUser=()=>{
    return ((dispatch) =>{
        firebase.firestore()
            .collection("students")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                var currentUser = snapshot.data();
                    dispatch(setCurrentUser(currentUser))
            })
        })
    }

    const fetchUserPosts=()=>{
        return ((dispatch) =>{
            firebase.firestore()
                .collection("students")
                .doc(firebase.auth().currentUser.uid)
                .collection("studentPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc =>{
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data}
                    })
                        dispatch(setPosts(posts))
                })
            })
        }

export {setCurrentUser, fetchUser, fetchUserPosts };