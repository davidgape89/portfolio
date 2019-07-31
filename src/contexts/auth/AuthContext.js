import React, {useReducer, createContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {firebase} from '../../firebase/firebase';
import reducer, {initialState} from './authReducer';
import {setUser} from './authActions';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
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
            });
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
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
    <AuthContext.Consumer>
      {(authContext) => (
        <Component {...props} {...{authContext}}/>
      )}
    </AuthContext.Consumer>
  );

export {withAuth, AuthContextProvider};
