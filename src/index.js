import './styles/main.scss';
import logo5 from './assets/logo5.png';
import { getMovie } from './modules/getMovies.js';
import showSelectedMovie from './modules/popUp.js';

const logo = document.getElementById('logo');
logo.src = logo5;

const container = document.querySelector('.grid_container');

async function display(data) {
  const leng = data.length;
  const totalItems = document.querySelector('.item_number');
  totalItems.innerHTML = `Movies(${leng})`;

  container.innerHTML = '';
  // const result = '';
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
    likeBtn.innerHTML = '<i class="fa-sharp fa-regular fa-heart"></i>';

    const likes = document.createElement('div');
    likes.innerText = `${item.id} likes`;

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
      showSelectedMovie(item.id);
    });
  });
}

async function show() {
  const showMovie = await getMovie();
  display(showMovie);
}

show();
