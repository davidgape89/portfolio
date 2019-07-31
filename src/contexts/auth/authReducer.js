export const initialState = {
  uid: '',
  roles: [],
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
