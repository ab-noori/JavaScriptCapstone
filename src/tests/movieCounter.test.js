/**
 * @jest-environment jsdom
 */

const movieCount = require('./movieCounter.js');


describe('Test movie counter', () => {
  it('Movie counter returns zero since no value was diplayed', () => {
    //Arrange
    document.body.innerHTML = `
        <main></main>`;
    
    //Act
    const movie = movieCount();

    //Assert
    expect(movie).toBe(0);
  });

  it('The movie counter returns the right number of movies displayed', () => {
    //Arrange
    document.body.innerHTML = `
        <main>
            <div class="sec"></div>
            <div class="sec"></div>
            <div class="se"></div>
        </main>`;
    
    //Act
    const movie = movieCount();

    //Assert
    expect(movie).toBe(2);
  });

});