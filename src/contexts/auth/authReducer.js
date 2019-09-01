export const initialState = {
  email: null,
  displayName: null,
  photoUrl: null,
  roles: [],
  uid: null,
};

export default (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'LOG_OUT':
      return {...initialState};
    default:
      return state;
  }
};
