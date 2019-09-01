import {database} from './firebase';

/**
 * Makes a request to create a new post
 */
// export function newPost(
//   title,
//   content,
//   authorUid,
// ) {
//   let postData = {
//     title,
//     content,
//     creationDate: new Date().getTime(),
//     author: authorUid,
//   };

//   database.ref('/posts');
// }

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
