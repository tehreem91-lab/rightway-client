import {
    CREATE_NEW_USER ,UPDATE_USER , DELETE_USER , FETCH_ALL_USER
} from '../../constants/actionTypes.js'

 

export default function UserReducer(users=[], action){
    switch(action.type){
        case FETCH_ALL_USER: 
            return action.payload;
        case DELETE_USER: 
            return users.filter((user)=>user.id ===action.payload.id? action.payload:user);
        default:
            return users
    }
}