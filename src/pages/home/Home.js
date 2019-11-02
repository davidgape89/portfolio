import React, {useState, useEffect} from 'react';
import Article from '../../components/article/Article';
import {withAuth} from '../../contexts/auth/AuthContext';
import {getPosts, deletePost} from '../../firebase/firestore';

import './Home.scss';

const Home = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then((value) => {
      setLoading(false);
      setPosts(value);
    });
  }, []);

  const runDeletePost = (id) => {
    console.log(id);
    deletePost(id).then(() => 
      setPosts(posts.filter(post => post.id !== id))
    ).catch((error) => console.log(error));
  }
  
  return (
    <div className="home-page">
      <div className="home-page__content">
        {posts && posts.map((post) => (
          <Article key={post.id} 
            {...post}
            deletePost={runDeletePost.bind(null, post.id)}/>
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
