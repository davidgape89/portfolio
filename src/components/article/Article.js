import React from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import moment from 'moment';
import CodeBlock from '../code-block/CodeBlock';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {withAuth} from '../../contexts/auth/AuthContext';

import './Article.scss';

const renderersConfig = {
  'code': CodeBlock,
};

const Article = (props) => {
  const {
    id,
    title,
    content,
    authorName,
    creationDate,
    deletePost,
    user
  } = props;
  
  const formattedDate = moment(creationDate).format("Do MMM YYYY");
  const isAdmin = () => user.roles.includes('admin');

  return (
    <article>
      <div className="article__header">
        <div className="article__header__title">
          <h1>{title}</h1>
          <div className="article__header__sub-title">
            <span>{authorName}, {formattedDate}</span>
          </div>
        </div>
        {isAdmin() && <div className="article__header__actions">
          <Link to={`/admin/post/${id}`}>
            <FaEdit></FaEdit>
          </Link>
          <FaTrash onClick={deletePost}>
          </FaTrash>
        </div>}
      </div>
      
      <div className="article__content">
        <ReactMarkdown
          source={content}
          renderers={renderersConfig}
        />
      </div>
    </article>
  );
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

Article.defaultProps = {};

export default withAuth(Article);
