export const initialState = {
  token: null,
  user:{}
};

export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
