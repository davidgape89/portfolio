import React from 'react';
import Article from '../../components/article/Article';
import article from '../../assets/mocks/article';
import {withAuth} from '../../contexts/auth/AuthContext';

import './Home.scss';

const Home = (props) => {
  console.log(props);
  return (
    <div className="home-page">
      <div className="home-page__content">
        <Article {...article} />
      </div>
    </div>
  );
};

export default withAuth(Home);
