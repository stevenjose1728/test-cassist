function products(state = [], action: any){

    const copy: any[] = [...state];

    switch (action.type) {

        case "SET_PRODUCTS":
            return action.payload;

        case "UPDATE_SOME_PRODUCTS":
            action.payload.forEach( (product: any) => {
                const index = copy.findIndex( (item: any) => item.id === product.id);
                if (index>=0) copy[index] = product;
            });
            return copy;

        case "CLEAR_PRODUCTS":
            return [];

        case "SET_PRODUCT":
            const index = copy.findIndex( item => item.id === action.payload.id);
            if (index>=0) {
                copy[index] = action.payload;
            } else {
                copy.push(action.payload);
            }
            return copy;

        case "REMOVE_PRODUCT":
            return  copy.filter(item => item.id !== action.payload.id);

        default:
            return state;
    }

}

export default products;
