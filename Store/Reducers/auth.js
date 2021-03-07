import { AUTHENTICATE, LOGOUT } from "../Actions/auth";

const initialState = {
  token: null,
  userId: null,
  name: null,
  picture: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        name : action.name,
        picture: action.picture
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
