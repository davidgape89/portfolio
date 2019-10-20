import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import Editor from '../../components/editor/Editor';
import {withAuth} from '../../contexts/auth/AuthContext';
import {login} from '../../firebase/firebase';
import {newPost} from '../../firebase/database';

import './Admin.scss';

const Admin = ({user, logout, history}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createNewPost = () => {
    setIsLoading(true);
    newPost(title, content, user.uid, user.displayName)
      .then(() => history.push('/'))
      .catch(() => setIsLoading(false));
  }

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
          <div className="admin-page__post-form">
            <label htmlFor="title">Title</label>
            <input
              aria-label="Title"
              autoComplete="off"
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
            <button onClick={createNewPost}>
              Send Post
            </button>
          </div>
        }
        {(user.loading || isLoading) && 
          <img src="/img/loading.svg"
            className="admin-page__loading-spinner"
          />
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

export default withRouter(withAuth(Admin));
