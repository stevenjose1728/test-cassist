import {createStore, Store} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {rootReducer as reducers} from '../reducers';
import AsyncStorage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'marketplace-web',
    storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store: Store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };