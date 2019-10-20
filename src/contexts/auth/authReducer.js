export const initialState = {
  email: null,
  displayName: null,
  photoUrl: null,
  roles: [],
  uid: null,
  loading: false,
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
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
