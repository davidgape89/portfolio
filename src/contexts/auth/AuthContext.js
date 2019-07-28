import React, {useReducer, createContext} from 'react';
import PropTypes from 'prop-types';
import reducer from './authReducer';

const AuthContext = createContext();
const initialState = {
  user: {},
};

const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Firebase login if necessary
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

const connectAuth = (Component) => {
  return (props) => (
    <AuthContext.Consumer>
      {(context) => (
        <Component {...props} {...context} />
      )}
    </AuthContext.Consumer>
  );
};
const AuthContextConsumer = AuthContext.Consumer;

export {AuthContextProvider, AuthContextConsumer, connectAuth};
