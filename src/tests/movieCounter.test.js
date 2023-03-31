/**
 * @jest-environment jsdom
 */


const movieCounter = require('./movieCounter');
describe('Test movie counter', () => {
    it('return null', () => {
        document.body.innerHTML = `
        <div class="item_number"></div>`;

        const data = [];
        const leng = movieCounter(data);
        const totalItems = document.querySelector('.item_number');
        totalItems.innerHTML = `Movies(${leng})`;

        expect(leng).toBe(0)

    });

    it('return null', () => {
        document.body.innerHTML = `
        <div class="item_number"></div>
        <main class="grid_container">            
        </main>
        `;

        const data = ['lions', 'We are here', 'Dont go'];
        const leng = movieCounter(data);
        const totalItems = document.querySelector('.item_number');
        totalItems.innerHTML = `Movies(${leng})`;

        data.forEach((item) => {
            const movieCont = document.querySelector('.grid_container');
            const movie = document.createElement('div');
            movieCont.appendChild(movie);

            movie.innerHTML = `${item.name}`;

        });

        expect(leng).toBe(3);

    });
});