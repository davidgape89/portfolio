import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

import './Article.scss';

const Article = (props) => {
  const { title, content } = props;

  return (
    <article>
      <h1>{title}</h1>
      <div className="article__content">
        <ReactMarkdown
          source={content}
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

export default Article;
