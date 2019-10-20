import React, {useReducer, createContext, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {firebase} from '../../firebase/firebase';
import reducer, {initialState} from './authReducer';
import {setUser, setLoading, logOut} from './authActions';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const logout = () => firebase.auth().signOut()
      .then(() => dispatch(logOut()))
      .catch(() => console.warn('There was a problem logging out'));

  useEffect(() => {
    dispatch(setLoading(true));
    firebase.auth().onAuthStateChanged((response) => {
      dispatch(setLoading(false));
      if (response) {
        const {uid, displayName, photoUrl, email} = response;
        dispatch(setUser({
          uid,
          displayName,
          email,
          photoUrl,
        }));
        firebase.database().ref(`users/${uid}`)
            .once('value')
            .then((snapshot) => {
              const {roles} = snapshot.val();
              dispatch(setUser({
                roles,
              }));
            })
            .catch(() => {
              dispatch(setUser({
                roles: [],
              }));
            });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state,
        authDispatch: dispatch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const withAuth = (Component) =>
  (props) => (
    <Component {...props} {...useContext(AuthContext)}/>
  );

export {withAuth, AuthContextProvider};
