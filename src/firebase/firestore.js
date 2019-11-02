import {firestore} from './firebase';
import moment from 'moment';

/**
 * Makes a request to create a new post
 * @param {string} title  Title of the post
 * @param {string} content Content of the post (mark-down)
 * @param {string} authorUid Author of the post
 * @param {string} authorName Display name of the author
 * @return {Promise} Promise of when the post have been posted.
 */
export function newPost(
    title,
    content,
    authorUid,
    authorName,
) {
  const postData = {
    title,
    content,
    creationDate: moment().valueOf(),
    author: authorUid,
    authorName,
  };

  return firestore.collection('posts').add(postData);
}

/**
 * Gets posts
 *
 * @return {Promise} A promise containing the posts
 */
export function getPosts() {
  return firestore.collection('posts')
      .get()
      .then((snapshot) => snapshot.docs.map((post) => ({
          id: post.id,
          ...post.data(),
      })));
}

/**
 * Remove post
 * 
 * @param {number} id Id of the post to be removed
 */
export function deletePost(id) {
  return firestore.collection('posts')
      .doc(id)
      .delete();
}
