function countListItems(list) {
  if (list == null) {
    return 0;
  }
  return list.querySelectorAll('li').length;
}

module.exports = { countListItems };
