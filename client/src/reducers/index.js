import {rest} from '../rest/rest'

const initialState = {User:JSON.parse(localStorage.getItem('User') || '{}')};

export const actionCreators = {
    Login: ({email,password}) => async (dispatch, getState) => {
        const token = await rest.Login({email,password});
        dispatch({ type: "LOGIN",User: token[0] });
        localStorage.setItem("User",JSON.stringify(token[0]))
        return token[0];
    },
    Register: ({login,password,email,phoneNumber}
    ) => async (dispatch, getState) =>{
          let res = await rest.Register({login, password, email, phoneNumber});
          return  res;
    },
    UserExit: ()=> (dispatch, getState)=>{
        dispatch({type: 'LOGIN',User: null})
        localStorage.clear()
    },
    DeleteCartItem: (itemId) => async (dispatch,getState)=> {
        let state = getState().state;
        if(state.User && state.User.userId){
            rest.DeleteCartItem({
                ShopItemId: itemId,
                userId: state.User.userId});
            let res = await rest.GetUserCart({userId: state.User.userId});
            dispatch({type: 'SET_CART',cart: res })
        }
        else {
            let cart = state.cart;
            cart.splice(cart.findIndex(k => k.itemId === itemId),1);
            dispatch({type: 'SET_CART',cart: cart })
        }
    }
        ,
    SetCountCart: (value,itemId) => async (dispatch,getState)=>{

        let state = getState().state;
        if(state.User && state.User.userId){
            console.log('Item',itemId)
            await rest.UpdateCountCart({count: value, itemId: itemId, userId: state.User.userId});
            let res = await rest.GetUserCart({userId: state.User.userId});
            dispatch({type: 'SET_CART',cart: res })
        }
        else {
            let cart = state.cart;
            let newCount =  cart.find(k => itemId === itemId);
            newCount.count = value;
            dispatch({type: 'SET_CART',cart: [...cart] })
        }

    },
    AddToCart: (Item) => async (dispatch,getState)=>{
        let state = getState().state;
        let exist = state.cart.find(k=>k.ShopItemId === Item.ShopItemId);
        if(state.User && state.User.userId) {
            console.log('add')
            if(!exist) {
                console.log('add3')
                console.log(Item);
                await rest.AddToCart({ItemId: Item.ShopItemId,userId: state.User.userId,count:1});
                dispatch({type: 'CART', cart: [...state.cart, Item]})
            }
        }
        else {
            if (!exist) {
                dispatch({type: 'CART', cart:  [...state.cart, Item]})
            }
        }
        },
    ClearCart:  ()=> async (dispatch,getState)=>{
            dispatch({type: 'SET_CART',cart: [] })
    },
    GetCart: ()=> async (dispatch,getState)=>{
        let state = getState().state;
        console.log('User',state);
        if(state.User && state.User.userId){
            console.log('Cart')
                let res = await rest.GetUserCart({userId: state.User.userId});
                dispatch({type: 'SET_CART',cart: res })
            }
            else {
            console.log('Cart2')
            }
    }
};

export const loadActions = ()=>{
    const exclude = ['Login','AddToCart','DeleteCartItem'];
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


export const reducer = (state = {User:JSON.parse(localStorage.getItem('User')),data: [],cart:[]}, action) => {
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
            cart: [...action.cart]
        };
    }
    return state;
};
