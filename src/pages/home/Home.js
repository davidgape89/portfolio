import React from 'react';
import Article from '../../components/article/Article';
import article from '../../assets/mocks/article';

import './Home.scss';

export default () => (
  <div className="home-page">
    <div className="home-page__content">
      <Article {...article} />
    </div>
  </div>
);
