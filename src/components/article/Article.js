import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CodeBlock } from '../code-block/CodeBlock';

import './Article.scss';

const renderersConfig = {
  'code': CodeBlock,
};

const Article = (props) => {
  const {
    title,
    content,
    authorName,
    creationDate,
  } = props;
  const formattedDate = moment(creationDate).format("Do MMM YYYY");

  return (
    <article>
      <h1>{title}</h1>
      <div className="article__sub-title">
        <span>{authorName}, {formattedDate}</span>
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

export default Article;
