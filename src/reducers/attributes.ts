function attributes(state: [] = [], action: any) {

    const copy: any[] = [...state];

    switch (action.type) {

        case "SET_ATTRIBUTES":
            return action.payload;

        case "SET_ATTRIBUTE":
            const index = copy.findIndex( item => item.id === action.payload.id );
            if (index>=0) {
                copy[index] = action.payload;
            } else {
                copy.push(action.payload);
            }
            return copy;

        case "CLEAR_ATTRIBUTES":
            return [];

        case "REMOVE_ATTRIBUTE":
            return copy.filter(item => item.id !== action.payload.id);

        default:
            return state;

    }

}

export default attributes;
