/**
 * Created by clstrfvck on 12/04/2017.
 */

export default function reducer( state = {
    email: "",
    password: "",
    secondaryPass: "",
    loading: false,
    loggedIn: false,
    error: null,
    details: {},
    navigateToRoot: false
}, action) {
    switch(action.type) {
        case "LOG_IN_ATTEMPT": {
            return { ...state, loading:true, error: false}
        }
        case "LOG_IN_FAILED": {
            return { ...state, loading: false, error: action.payload}
        }
        case "LOG_IN_SUCCESSFUL": {
            console.log("login successful!");
            return { ...state, loading: false, loggedIn: true, error: null, details: action.payload}
        }
        case "LOG_OUT": {
            return {loading: false, loggedIn: false, error: null, details: {}}
        }
        case "LOGIN_CREDS" : {
            let allowedKeys = ["email", "password"];
            if(allowedKeys.indexOf(action.payload.key) >= 0) {
                return {...state, [action.payload.key]: action.payload.data}
            }
            else break
        }
        case "VALIDATION_ATTEMPT" : {
            return{...state, error: null, email: null, password: null, secondaryPass: null, loading: true}
        }
        case "VALIDATION_SUCCESS" : {
            return {...state, loading: false, error: null, email: null, password: null, secondaryPass: null, navigateToRoot: true}
        }
        case "VALIDATION_FAILURE" : {
            return {...state, loading: false, error: action.payload}
        }
        case "VALIDATION_MISMATCH" : {
            return {...state, loading: false, error: action.payload}
        }

        default: {
            return {
                ...state
            }
        }
    }
}