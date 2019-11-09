import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
};

export default function(state = initialState, action ) {
    switch(action.type) {
    case SET_CURRENT_USER:
        console.log(action.payload);
        return {
            ...state,
            isAuthenticated: action.payload && action.payload.id,
            user: action.payload,
        };
    default:
        return state;
    }
}
