import {database} from './firebase';

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
    creationDate: new Date().getTime(),
    author: authorUid,
    authorName,
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
