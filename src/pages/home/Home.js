import React, {useState, useEffect} from 'react';
import Article from '../../components/article/Article';
import {withAuth} from '../../contexts/auth/AuthContext';
import {getPosts} from '../../firebase/database';

import './Home.scss';

const Home = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((posts) => {
      console.log(posts);
      setPosts(posts);
    });
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__content">
        {posts && posts.map((post, index) => (
          <Article key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default withAuth(Home);
