import { ADD_PRODUCT, EDIT_PRODUCT } from "../Actions/Product";

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      let data = action.data;
      const item = {
        name: data.name,
        UID: data.UID,
        details: data.details,
        price: data.price,
        image: data.image,
      };

      return { ...state.items, item };

    default:
      return state;
  }
};
