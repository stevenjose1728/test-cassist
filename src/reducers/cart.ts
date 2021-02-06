import {Product} from 'models'
interface Action {
    payload: Product | null,
    type: string
}

function user(state: Product | null = null, action: Action): Product | null {
	switch(action.type) {
		case 'SET_USER':
            return action.payload;
        case 'REMOVE_USER':
            return null;
        default:
        	return state;
	}
}

export default user;