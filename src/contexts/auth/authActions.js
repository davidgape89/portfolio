export const setUser = (payload) => ({
  type: 'SET_USER',
  payload,
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const setLoading = (payload) => ({
  type: 'SET_LOADING',
  payload,
});
