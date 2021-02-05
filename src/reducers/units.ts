function units(state: [] = [], action: any) {

    const copy: any[] = [...state];

    switch (action.type) {

        case "SET_UNITS":
            return action.payload;

        case "SET_UNIT":
            const index = copy.findIndex( item => item.id === action.payload.id );
            if (index>=0) {
                copy[index] = action.payload;
            } else {
                copy.push(action.payload);
            }
            return copy;

        case "CLEAR_UNITS":
            return [];

        case "REMOVE_UNIT":
            return copy.filter(item => item.id !== action.payload.id);

        default:
            return state;

    }

}

export default units;
