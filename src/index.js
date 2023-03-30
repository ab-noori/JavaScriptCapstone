import './styles/main.scss';
import logo5 from './assets/logo5.png';
import { getMovie, getLikes, postLikes } from './modules/getMovies.js';

const logo = document.getElementById('logo');
logo.src = logo5;

const container = document.querySelector('.grid_container');

const apiDataExchange = async() => {
  const movieData = await getMovie();
  movieData.forEach((item) => {
    //postLikes(item.id, 0);
    //console.log(item)
    //return item;
  }); //console.log(item) 
}
apiDataExchange()

async function display(data) {
  const leng = data.length;
  const totalItems = document.querySelector('.item_number');
  totalItems.innerHTML = `Movies(${leng})`;

  container.innerHTML = '';
  const result = '';
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
    likeBtn.innerHTML = '<i class="fa-sharp fa-regular fa-heart"></i>';

    const likes = document.createElement('div');
    
//    likes.innerText = `${item.id} likes`;
     // likes.innerText = `${v} likes`;
     const dispLikes = async() => {
      const like = await getLikes();
      like.forEach((id)=> {

        if(id.item_id === item.id) {
          likes.innerText = `${id.likes} likes`;
          
        }
        })
     }
     dispLikes()

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
      alert(item.id);
    });

    likeBtn.addEventListener('click', async() => {
      const currentLike = await getLikes();     
      console.log(currentLike);
      
     currentLike.forEach((id)=> {
      //console.log(id.item_id + " " + id.likes) 
      
      if(item.id === id.item_id) {
        let t = id.likes;alert(t)
        t++;
        alert(t);
        postLikes(item.id, t);
      }
      /*else if(){

      }*/
      })    
    });

  });
}

async function show() {
  const showMovie = await getMovie();
  display(showMovie);
}

show();

/*
const commentBtn = document.querySelector('.comment');
commentBtn.addEventListener('click', () => {
    alert(ok)
}) */
