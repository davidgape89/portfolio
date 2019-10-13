import React, {useState} from 'react';
import {PropTypes} from 'prop-types';
import Editor from '../../components/editor/editor';
import {withAuth} from '../../contexts/auth/AuthContext';
import {login} from '../../firebase/firebase';

import './Admin.scss';

const Admin = ({user, logout}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="admin-page">
      <div className="admin-page__content">
        <div className="admin-page__action-buttons">
          {!user.uid &&
            <button onClick={login}>
              Login
            </button>
          }
          {user.uid &&
            <button onClick={logout}>
              Log Out
            </button>
          }
        </div>
        {user.uid &&
          <React.Fragment>
            <label htmlFor="title">Title</label>
            <input
              aria-label="Title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text" />
            <label htmlFor="content">
              <span>Content</span>
              <Editor
                name="content"
                value={content}
                onChange={(event) => setContent(event)}
                aria-label="content" />
            </label>
          </React.Fragment>
        }
      </div>
    </div>
  );
};

Admin.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
    photoUrl: PropTypes.string,
    roles: PropTypes.array,
  }),
  authDispatch: PropTypes.func,
  logout: PropTypes.func,
};

export default withAuth(Admin);
