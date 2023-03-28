import './styles/main.scss';
import logo5 from './assets/logo5.png';

let contArr = [
    {   img: logo5,
        itemCount: 1,
        likes: 4,
    },
    {
        img: logo5,
        itemCount: 2,
        likes: 9,
    },
    {
        img: logo5,
        itemCount: 3,
        likes: 1,
    },
    {
        img: logo5,
        itemCount: 4,
        likes: 6,
    },
    {
        img: logo5,
        itemCount: 5,
        likes: 7,
    },
    {
        img: logo5,
        itemCount: 6,
        likes: 0,
    },
]

const leng = contArr.length;

const container = document.querySelector('.grid_container');

const logo =document.getElementById('logo');
logo.src = logo5;

const totalItems = document.querySelector('.item_number');
totalItems.innerHTML = `Space ships(${leng})`;

//container.innerHTML = 'We made it';
container.innerHTML = '';
let result = ``;
contArr.forEach((item) => {
    result += `
    <section class="sec">
                <img class="grid_img" src=${item.img} alt="space">
                <br>
                <div class="space_like">
                    <div>Space ${item.itemCount}</div>
                    <div class="like_cont">
                        <i class="fa-sharp fa-regular fa-heart"></i>
                        <div>${item.likes} likes</div>
                    </div>
                </div>
                <br>
                <button class="comment">Comments</button>
            </section>

    `;   

});

container.innerHTML = result;
