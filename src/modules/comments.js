import { countListItems } from '../tests/commentCounter.js';

const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/JLV3hpmsnDwkVwtlFatp/comments';

const addcommentsToList = (comment) => {
  const list = document.querySelector('#comment-list');
  const li = document.createElement('li');

  const span = document.createElement('span');

  span.innerHTML = `${comment.creation_date}  ${comment.username}:   ${comment.comment}`;

  li.appendChild(span);
  list.appendChild(li);
  const h3 = document.querySelector('#commentTitle');
  const countComments = countListItems(list);
  h3.innerHTML = `Comments(${countComments})`;
};

export const displayComments = async (targetMovie) => {
  const comments = await (await fetch(`${api}?item_id=${targetMovie}`)).json();
  comments.forEach((comment) => addcommentsToList(comment));
};

// eslint-disable-next-line camelcase
export const postComment = async (item_id, username, comment) => {
  const newComment = {
    item_id, username, comment, creation_date: new Date().toISOString(),
  };

  addcommentsToList(newComment);

  const res = await fetch(api,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ item_id, username, comment }),
    });
  const data = await res.json();

  return data.result;
};