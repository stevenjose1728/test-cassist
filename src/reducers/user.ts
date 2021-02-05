import {User} from 'models'
interface Action {
    payload: User | null,
    type: string
}

function user(state: User | null = null, action: Action): User | null {
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