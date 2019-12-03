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
 * @param {number} limit Limit of posts per page
 * @param {number} page Page being requested
 * @return {Promise} A promise containing the posts
 */
export function getPosts(limit = 5, page = 1) {
  if (page === 0) {
    return firestore.collection('posts')
        .orderBy('creationDate', 'desc')
        .limit(limit)
        .get()
        .then((posts) => posts.docs.map((post) => ({
          id: post.id,
          ...post.data(),
        })));
  } else if (page > 0) {
    const first = firestore.collection('posts')
        .orderBy('creationDate', 'desc')
        .limit(limit * page)
        .get();

    return first.then((posts) => {
      const lastVisible = posts.docs[posts.docs.length-1];

      return firestore.collection('posts')
          .orderBy('creationDate', 'desc')
          .startAfter(lastVisible)
          .limit(limit)
          .get()
          .then((snapshot) => snapshot.docs.map((post) => {
            return ({
              id: post.id,
              ...post.data(),
            });
          }));
    });
  }
}

/**
 * Gets post by id
 *
 * @param {number} id Id of the post
 * @return {Promise} A promise containing the post
 */
export function getPostById(id) {
  return firestore.collection('posts')
      .doc(id)
      .get()
      .then((snapshot) => ({
        id,
        ...snapshot.data(),
      }));
}

/**
 * Edit post by id
 *
 * @param {number} id Id of the post
 * @param {string} title Title of the post to modify
 * @param {string} content Content of the post to modify
 * @return {Promise} A promise containing the post
 */
export function editPostById(id, title, content) {
  return firestore.collection('posts')
      .doc(id)
      .update({
        title,
        content,
        lastEditedDate: moment().valueOf(),
      });
}

/**
 * Remove post
 *
 * @param {number} id Id of the post to be removed
 * @return {Promise} A void promise after deletion
 */
export function deletePost(id) {
  return firestore.collection('posts')
      .doc(id)
      .delete();
}
