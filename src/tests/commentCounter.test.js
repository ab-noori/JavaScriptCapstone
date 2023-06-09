const { countListItems } = require('./commentCounter.js');

describe('countListItems', () => {
  test('returns 0 for an empty list', () => {
    const list = document.createElement('ul');
    expect(countListItems(list)).toBe(0);
  });

  test('returns the correct count for a list with items', () => {
    const list = document.createElement('ul');
    list.innerHTML = '<li>Item 1</li><li>Item 2</li><li>Item 3</li>';
    expect(countListItems(list)).toBe(3);
  });

  test('returns 0 if the list is null or undefined', () => {
    expect(countListItems(null)).toBe(0);
    expect(countListItems(undefined)).toBe(0);
  });
});