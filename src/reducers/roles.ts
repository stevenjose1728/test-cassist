function roles(state: [] = [], action: any) {

    const copy: any[] = [...state];

    switch (action.type) {

        case "SET_ROLES":
            return action.payload;

        case "SET_ROLE":
            const index = copy.findIndex(({id}) => id === action.payload.id );
            if (index>=0) {
                copy[index] = action.payload;
            } else {
                copy.push(action.payload);
            }
            return copy;

        case "CLEAR_ROLES":
            return [];

        case "REMOVE_ROLE":
            return copy.filter(({id}) => id !== action.payload.id);

        default:
            return state;

    }

}

export default roles;
