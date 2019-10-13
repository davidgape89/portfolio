import {database} from './firebase';

/**
 * Makes a request to create a new post
 * @param {string} title  Title of the post
 * @param {string} content Content of the post (mark-down)
 * @param {string} authorUid Author of the post
 * @return {Promise} Promise of when the post have been posted.
 */
export function newPost(
    title,
    content,
    authorUid,
) {
  const postData = {
    title,
    content,
    creationDate: new Date().getTime(),
    author: authorUid,
  };

  return getPosts().then((posts) => {
    if (posts) {
      return database.ref('/posts').set([
        ...posts,
        postData,
      ]);
    } else {
      return database.ref('/posts').set([
        postData,
      ]);
    }
  });
}

/**
 * Gets posts
 *
 * @return {Promise} A promise containing the posts
 */
export function getPosts() {
  return database.ref('/posts').once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
        return snapshot.val();
      });
}
