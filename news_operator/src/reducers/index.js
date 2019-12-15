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
    },
    AddToCart: (Item) => async (dispatch,getState)=>{
        let state = getState().state;
        let exist = state.cart.find(k=>k.ShopItemId === Item.ShopItemId);
        if(state && state.userId) {
            if(!exist) {
                let res =await rest.AddToCart(Item);
                dispatch({type: 'CART', cart: [...state.cart, Item]})
            }
        }
        else {
            if (!exist) {
                dispatch({type: 'CART', cart:  [...state.cart, Item]})
            }
        }
        },
    GetCart: ()=> async (dispatch,getState)=>{
        let state = getState().state;
        if(state && state.userId){
                let res = await rest.GetUserCart(state.userId);
                dispatch({type: 'SET_CART',cart: res })
            }
            else {

            }
    }
};

export const loadActions = ()=>{
    const exclude = ['Login','AddToCart'];
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


export const reducer = (state = {data: [],cart:[]}, action) => {
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
        };
        case 'CART': return {
            ...state,
            cart:action.cart
        };
        case 'SET_CART': return {
            ...state,
            cart: action.cart
        };
    }
    return state;
};
