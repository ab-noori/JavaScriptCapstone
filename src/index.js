import './styles/main.scss';
import logo5 from './assets/logo5.png';
import { getMovie, involve } from './modules/getMovies.js';

const logo = document.getElementById('logo');
logo.src = logo5;

const container = document.querySelector('.grid_container');

async function display(data) {   
    const leng = data.length;
    const totalItems = document.querySelector('.item_number');
    totalItems.innerHTML = `Movies(${leng})`;

container.innerHTML = '';
let result = '';
data.forEach((item) => {
    const section = document.createElement('section');
    section.classList.add('sec');

    const movie_img = document.createElement('img');
    movie_img.classList.add('grid_img');
    movie_img.src = item.image.medium;

    const spacelikeCont = document.createElement('div');
    spacelikeCont.classList.add('space_like');

    const name = document.createElement('div')
    name.innerText = `${item.id}.  ${item.name} `;

    const likeCont = document.createElement('div');
    likeCont.classList.add('like_cont');

    const likeBtn = document.createElement('button');
    likeBtn.innerHTML = `<i class="fa-sharp fa-regular fa-heart"></i>`;

    const likes = document.createElement('div');
    likes.innerText = `${item.id} likes`;

    const commentBtn = document.createElement('button');
    commentBtn.innerText = 'comments'
    commentBtn.classList.add('comment');

    section.appendChild(movie_img);
    section.appendChild(spacelikeCont);
    spacelikeCont.appendChild(name);
    spacelikeCont.appendChild(likeCont);

    likeCont.appendChild(likeBtn);
    likeCont.appendChild(likes);

    container.appendChild(section);
    section.appendChild(commentBtn);
//comment event listener
    commentBtn.addEventListener('click', () => {
        alert(item.id);
    });

    
});

}

async function show() {
    let showMovie = await getMovie();
    display(showMovie);
}

show();


/*
const commentBtn = document.querySelector('.comment');
commentBtn.addEventListener('click', () => {
    alert(ok)
})*/



