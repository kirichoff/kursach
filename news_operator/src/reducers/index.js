import {createRest, rest} from '../rest/rest'
import authHelper from "../utils/authHelper";

const initialState = {};

export const actionCreators = {
    Login: ({login,password}) => async (dispatch, getState) => {
        const token = await rest.Login({login,password});
        let user= null;
        if (token.token){
            authHelper.saveAuth(token.userId,token.token);
            user = token;
        }
        dispatch({ type: "LOGIN",User: user });
    },
    Register: ({
                   UserName,
                   Password,
                   objectValue,
                   FirstName,
                   LastName,
                   Email}
    ) => async (dispatch, getState) =>{
        const user = {
            UserName: UserName,
            Password: Password,
            Type: objectValue === 'Admin',
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            StartDate: `${new Date().toISOString()}`
        };
        //let res = await rest.addUser(user)
      //  dispatch({type:'REGISTER_TRUE',res: res })
    }
};

export const loadActions = ()=>{
    const exclude = ['Login'];
    for(let property in rest){
        if (exclude.find(el => el === property))
            continue;
        actionCreators[property] = (params) => async (dispatch, getState) => {
            let res = await rest[property](params);
            dispatch({type: 'DATA', data: res});
            return res;
        };
    }
};


export const reducer = (state = {data: []}, action) => {
    state = state || initialState;
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                User: action.User
            };
        case 'DATA' : return {
            ...state,
            data:action.data
        }
    }
    return state;
};
