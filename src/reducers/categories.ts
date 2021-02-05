function categories(state: [] = [], action: any) {

    const copy: any[] = [...state];

    switch (action.type) {

        case "SET_CATEGORIES":
            return action.payload;

        case "SET_CATEGORY":
            const index = copy.findIndex(({id}) => id === action.payload.id );
            if (index>=0) {
                copy[index] = action.payload;
            } else {
                copy.push(action.payload);
            }
            return copy;

        case "CLEAR_CATEGORIES":
            return [];

        case "REMOVE_CATEGORY":
            return copy.filter(item => item.id !== action.payload.id);

        default:
            return state;

    }

}

export default categories;
