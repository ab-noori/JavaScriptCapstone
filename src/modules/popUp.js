import { getMovie } from './getMovies.js';
import { displayComments, postComment } from './comments.js';

function showModal(modal) {
  document.body.appendChild(modal);
  modal.style.display = 'block';
}

function hideModal(modal) {
  modal.style.display = 'none';
  modal.parentNode.removeChild(modal);
}

function createModal(data, targetMovie) {
  const filterResult = data.filter((item) => item.id === targetMovie);

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const imageSummaryFrame = document.createElement('div');
  imageSummaryFrame.classList.add('image-summary-frame');

  const imageFrame = document.createElement('div');
  imageFrame.classList.add('image-frame');

  const movieImage = document.createElement('img');
  movieImage.src = `${filterResult[0].image.medium}`;
  imageFrame.appendChild(movieImage);

  const summaryFrame = document.createElement('div');
  summaryFrame.classList.add('summary-frame');

  const titleFrame = document.createElement('h1');
  titleFrame.classList.add('title-frame');
  titleFrame.innerHTML = `${filterResult[0].name}`;
  summaryFrame.appendChild(titleFrame);

  const ul = document.createElement('ul');
  ul.innerHTML = `
    <li><dt>Genre:</dt><dd>${filterResult[0].genres[0]} ${filterResult[0].genres[1]}</dd></li>
    <li><dt>Type:</dt><dd>${filterResult[0].type}</dd></li>
    <li><dt>Language:</dt><dd>${filterResult[0].language}</dd></li>
    <li><dt>Summary:</dt><dd>${filterResult[0].summary}</dd></li>
  `;
  summaryFrame.appendChild(ul);

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '&times';

  imageSummaryFrame.appendChild(imageFrame);
  imageSummaryFrame.appendChild(summaryFrame);

  modalContent.appendChild(imageSummaryFrame);
  modalContent.appendChild(closeBtn);

  const commentFrame = document.createElement('div');
  commentFrame.classList.add('comment-frame');
  commentFrame.innerHTML = `
    <h3 id="commentTitle"></h3>
    <ul id="comment-list" class="comment-list">
      
    </ul>
    <h3>Add a comment</h3>
    <form id="comment-form">
        <input type="hidden" id="movieId" name="movieId" value="${filterResult[0].id}">
        <input type="text" id="username" placeholder="Your name">
        <input type="text" id="comment" placeholder="Your insights">
        <button id="new-comment-btn" type="submit" class="btn">Submit</button>
    </form>
  `;

  modalContent.appendChild(commentFrame);

  modal.appendChild(modalContent);

  showModal(modal);

  const form = document.querySelector('#comment-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const itemId = document.querySelector('#movieId').value;
    const username = document.querySelector('#username').value;
    const comment = document.querySelector('#comment').value;

    if (username !== '' && comment !== '') {
      document.querySelector('#username').value = '';
      document.querySelector('#comment').value = '';

      await postComment(itemId, username, comment);
    }
  });

  closeBtn.addEventListener('click', () => {
    hideModal(modal);
  });
}

export default async function showSelectedMovie(targetMovie) {
  const data = await getMovie();
  createModal(data, targetMovie);
  displayComments(targetMovie);
}
