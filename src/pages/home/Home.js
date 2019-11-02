import React, {useState, useEffect} from 'react';
import Article from '../../components/article/Article';
import {withAuth} from '../../contexts/auth/AuthContext';
import {getPosts} from '../../firebase/firestore';

import './Home.scss';

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then((value) => {
      setLoading(false);
      return setPosts(value)
    });
  }, []);
  
  return (
    <div className="home-page">
      <div className="home-page__content">
        {posts && posts.map((post, index) => (
          <Article key={index} {...post} />
        ))}
        {isLoading && 
          <img src="/img/loading.svg"
            alt="Loading spinner"
            className="admin-page__loading-spinner"
          />
        }
      </div>
    </div>
  );
};

export default withAuth(Home);
