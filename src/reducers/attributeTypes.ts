function attributeTypes(state: [] = [], action: any) {

    const copy: any[] = [...state];

    switch (action.type) {

        case "SET_ATTRIBUTE_TYPES":
            return action.payload;

        case "SET_ATTRIBUTE_TYPE":
            const index = copy.findIndex( item => item.id === action.payload.id );
            if (index>=0) {
                copy[index] = action.payload;
            } else {
                copy.push(action.payload);
            }
            return copy;

        case "CLEAR_ATTRIBUTE_TYPES":
            return [];

        case "REMOVE_ATTRIBUTE_TYPE":
            return copy.filter(item => item.id !== action.payload.id);

        default:
            return state;

    }

}

export default attributeTypes;
