import { combineReducers } from 'redux';
import user from './user';
import { TypedUseSelectorHook, useSelector } from "react-redux";
import cart from './cart';
export const rootReducer =  combineReducers({
    user,
    cart
});
export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
