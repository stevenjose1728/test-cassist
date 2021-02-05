import { combineReducers } from 'redux';
import user from './user';
import products from "./products";
import categories from "./categories";
import units from "./units";
import attributes from "./attributes";
import attributeTypes from "./attributeTypes";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import roles from "./roles";

export const rootReducer =  combineReducers({
    user,
    products,
    categories,
    units,
    attributes,
    attributeTypes,
    roles
});
export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
