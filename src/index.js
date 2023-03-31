import './styles/main.scss';
import logo5 from './assets/logo5.png';
import { getMovie, getLikes, postLikes } from './modules/getMovies.js';

const logo = document.getElementById('logo');
logo.src = logo5;

const container = document.querySelector('.grid_container');

// Total displayed items
const movieCount = () => document.querySelectorAll('.sec').length;

async function display(data) {
  container.innerHTML = '';
  data.forEach((item) => {
    const section = document.createElement('section');
    section.classList.add('sec');

    const movieImg = document.createElement('img');
    movieImg.classList.add('grid_img');
    movieImg.src = item.image.medium;

    const spacelikeCont = document.createElement('div');
    spacelikeCont.classList.add('space_like');

    const name = document.createElement('div');
    name.innerText = `${item.id}.  ${item.name} `;

    const likeCont = document.createElement('div');
    likeCont.classList.add('like_cont');

    const likeBtn = document.createElement('button');
    likeBtn.dataset.id = `${item.id}`;
    likeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>';

    // like counter function
    const likes = document.createElement('div');
    const dispLikes = async () => {
      const like = await getLikes();
      like.forEach((id) => {
        if (id.item_id === item.id) {
          likes.innerText = `${id.likes} likes`;
        }
      });

      // Movie count display
      const totalItems = document.querySelector('.item_number');
      totalItems.innerHTML = `Movies(${movieCount()})`;
    };
    dispLikes();

    const commentBtn = document.createElement('button');
    commentBtn.innerText = 'comments';
    commentBtn.classList.add('comment');

    section.appendChild(movieImg);
    section.appendChild(spacelikeCont);
    spacelikeCont.appendChild(name);
    spacelikeCont.appendChild(likeCont);

    likeCont.appendChild(likeBtn);
    likeCont.appendChild(likes);

    container.appendChild(section);
    section.appendChild(commentBtn);
    // comment event listener
    commentBtn.addEventListener('click', () => {
      // alert(item.id);
    });

    likeBtn.addEventListener('click', async () => {
      postLikes(item.id);
      dispLikes();
    });
  });
}

async function show() {
  const showMovie = await getMovie();
  display(showMovie);
}

show();
