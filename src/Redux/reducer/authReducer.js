const initialState = {
    loading: false,
    user:null,
    uid:""
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_LOADING':
            return {
                ...state,
                loading: action.payload,
            };

        case 'AUTH_LOGIN':
            return {
            ...state,
            user: action.payload.user,
            uid: action.payload.user.id,
            loading: action.payload,
            };

            case 'LOGOUT_SUCCESS':
                localStorage.clear();
            return {
                ...state,
            user: null,
            uid: "",
            }
        
        default:
            return {
                ...state,
            };
    }
};
export default authReducer;