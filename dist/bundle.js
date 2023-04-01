/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/comments.js":
/*!*********************************!*\
  !*** ./src/modules/comments.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayComments": () => (/* binding */ displayComments),
/* harmony export */   "postComment": () => (/* binding */ postComment)
/* harmony export */ });
/* harmony import */ var _tests_commentCounter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tests/commentCounter.js */ "./src/tests/commentCounter.js");
/* harmony import */ var _tests_commentCounter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tests_commentCounter_js__WEBPACK_IMPORTED_MODULE_0__);

const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/yGJsLE5rhYlcLOG1HopD/comments';
const addcommentsToList = comment => {
  const list = document.querySelector('#comment-list');
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = `${comment.creation_date}  ${comment.username}:   ${comment.comment}`;
  li.appendChild(span);
  list.appendChild(li);
  const h3 = document.querySelector('#commentTitle');
  const countComments = (0,_tests_commentCounter_js__WEBPACK_IMPORTED_MODULE_0__.countListItems)(list);
  h3.innerHTML = `Comments(${countComments})`;
};
const displayComments = async targetMovie => {
  const comments = await (await fetch(`${api}?item_id=${targetMovie}`)).json();
  comments.forEach(comment => addcommentsToList(comment));
};

// eslint-disable-next-line camelcase
const postComment = async (item_id, username, comment) => {
  const newComment = {
    item_id,
    username,
    comment,
    creation_date: new Date().toISOString()
  };
  addcommentsToList(newComment);
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      item_id,
      username,
      comment
    })
  });
  const data = await res.json();
  return data.result;
};

/***/ }),

/***/ "./src/modules/getMovies.js":
/*!**********************************!*\
  !*** ./src/modules/getMovies.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLikes": () => (/* binding */ getLikes),
/* harmony export */   "getMovie": () => (/* binding */ getMovie),
/* harmony export */   "postLikes": () => (/* binding */ postLikes)
/* harmony export */ });
const getMovie = async () => {
  const getMovie = await fetch('https://api.tvmaze.com/shows');
  const result = await getMovie.json();
  return result;
};
const api = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/yGJsLE5rhYlcLOG1HopD/likes';
const getLikes = async () => {
  const likesApi = await fetch(api);
  const likesArray = await likesApi.json();
  return likesArray;
};
const postLikes = async item => {
  const settings = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      item_id: item
    })
  };
  const fetchRes = await fetch(api, settings);
  return fetchRes;
};

/***/ }),

/***/ "./src/modules/popUp.js":
/*!******************************!*\
  !*** ./src/modules/popUp.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showSelectedMovie)
/* harmony export */ });
/* harmony import */ var _getMovies_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getMovies.js */ "./src/modules/getMovies.js");
/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comments.js */ "./src/modules/comments.js");


function showModal(modal) {
  document.body.appendChild(modal);
  modal.style.display = 'block';
}
function hideModal(modal) {
  modal.style.display = 'none';
  modal.parentNode.removeChild(modal);
}
function createModal(data, targetMovie) {
  const filterResult = data.filter(item => item.id === targetMovie);
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
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const itemId = document.querySelector('#movieId').value;
    const username = document.querySelector('#username').value;
    const comment = document.querySelector('#comment').value;
    if (username !== '' && comment !== '') {
      document.querySelector('#username').value = '';
      document.querySelector('#comment').value = '';
      await (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.postComment)(itemId, username, comment);
    }
  });
  closeBtn.addEventListener('click', () => {
    hideModal(modal);
  });
}
async function showSelectedMovie(targetMovie) {
  const data = await (0,_getMovies_js__WEBPACK_IMPORTED_MODULE_0__.getMovie)();
  createModal(data, targetMovie);
  (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.displayComments)(targetMovie);
}

/***/ }),

/***/ "./src/tests/commentCounter.js":
/*!*************************************!*\
  !*** ./src/tests/commentCounter.js ***!
  \*************************************/
/***/ ((module) => {

function countListItems(list) {
  if (list == null) {
    return 0;
  }
  return list.querySelectorAll('li').length;
}
module.exports = {
  countListItems
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n}\n\n.like_cont,\n.sec,\nfooter,\nbody {\n  display: flex;\n  flex-direction: column;\n}\n\nbody {\n  background-color: #13191c;\n  font-family: \"Roboto\", sans-serif;\n  margin: 0;\n  align-items: center;\n  padding-top: 40px;\n}\n\nheader {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 30px;\n  gap: 80px;\n  color: #f4f4f4;\n  font-size: 32px;\n  width: 70%;\n  height: auto;\n  background-image: linear-gradient(black, rgb(39, 30, 30), gray);\n}\n\n.logo {\n  border: 2px solid #f4f4f4;\n  width: 200px;\n}\n\n.head_cont {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 70%;\n  height: 120px;\n}\n\n.head_size {\n  width: 60%;\n  flex-grow: 10;\n}\n\n.item_number {\n  text-decoration: underline;\n}\n\n.grid_container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 1fr;\n  gap: 20px;\n  width: 70%;\n  height: auto;\n  padding: 30px;\n  margin-bottom: 80px;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n.grid_img {\n  border-radius: 5px;\n  width: 100%;\n  height: 400px;\n  border: 1px solid #f4f4f4;\n}\n\n.grid_img:hover {\n  border: 2px solid red;\n}\n\n.sec {\n  justify-content: space-between;\n  width: 100%;\n  height: 600px;\n  border-radius: 8px;\n}\n\n.space_like {\n  display: flex;\n  justify-content: space-between;\n  color: #f4f4f4;\n  font-size: 20px;\n  width: 100%;\n  height: 80px;\n  margin-bottom: 0;\n}\n\n.like_cont {\n  height: auto;\n}\n\nbutton {\n  width: 60px;\n  height: 50px;\n  border-radius: 8px;\n  margin-bottom: 5px;\n}\n\n.comment {\n  display: flex;\n  width: 100%;\n  height: 70px;\n  font-size: 32px;\n  color: #f4f4f4;\n  background: black;\n  justify-content: center;\n  align-items: center;\n  border: 2px solid #f4f4f4;\n  border-radius: 5px;\n}\n\nfooter {\n  border-top: 2px solid #f4f4f4;\n  width: 100%;\n  height: 80px;\n  justify-content: center;\n  align-items: center;\n  padding-left: 40px;\n  font-size: 20px;\n  color: #f4f4f4;\n  background: black;\n}\n\n.modal {\n  display: none;\n  position: fixed;\n  z-index: 99;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  overflow-y: scroll;\n  background-color: rgba(0, 0, 0, 0.9); /* darken the background */\n}\n.modal::-webkit-scrollbar {\n  width: 15px;\n  height: 3em; /* width of the entire scrollbar */\n}\n.modal::-webkit-scrollbar-track {\n  background: #e0de61; /* color of the tracking area */\n}\n.modal::-webkit-scrollbar-thumb {\n  background-color: rgba(255, 247, 247, 0); /* color of the scroll thumb */\n  border-radius: 20px; /* roundness of the scroll thumb */\n  border: 5px solid #743206; /* creates padding around scroll thumb */\n}\n\n.modal-content {\n  width: 80%;\n  min-height: 80%;\n  color: white;\n  background-color: #1c1919;\n  margin: 2% auto;\n  padding: 30px;\n  border: 1px solid #888;\n  border-radius: 10px;\n  position: relative;\n  overflow: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.modal-content .image-summary-frame {\n  display: flex;\n  gap: 30px;\n}\n.modal-content .image-frame {\n  display: inline-block;\n  border: 2px solid gainsboro;\n  border-radius: 3px;\n}\n.modal-content img {\n  border-radius: 3px;\n}\n.modal-content h1 {\n  margin-top: 0;\n}\n.modal-content ul {\n  width: 90%;\n  padding: 20px;\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  background-color: #292b2c;\n  gap: 10px;\n}\n.modal-content ul li {\n  display: flex;\n}\n.modal-content ul li dt {\n  width: 50px;\n}\n.modal-content ul li p {\n  margin: 0;\n}\n.modal-content .close-btn {\n  color: red;\n  cursor: pointer;\n  font-size: 2.5rem;\n  position: absolute;\n  top: 5px;\n  right: 20px;\n}\n.modal-content .comment-frame {\n  width: 100%;\n  min-height: 200px;\n  border: 2px solid black;\n  border-radius: 5px;\n  display: flex;\n  padding-bottom: 20px;\n  flex-direction: column;\n  align-items: center;\n}\n.modal-content .comment-frame ul {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.modal-content form {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 10px;\n}\n.modal-content form input {\n  width: 100%;\n}\n.modal-content .btn {\n  background-color: #f4f4f4;\n  color: #13191c;\n  border: 0;\n  height: 20px;\n  border-radius: 4px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\n  font-size: 10px;\n  cursor: pointer;\n  align-self: center;\n}\n.modal-content .btn:active {\n  transform: scale(0.98);\n}\n.modal-content .btn:focus {\n  outline: 0;\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');\r\n\r\n$primary-color: #13191c;\r\n$secondary-color: #f4f4f4;\r\n$box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\r\n\r\n* {\r\n  box-sizing: border-box;\r\n}\r\n\r\n.like_cont,\r\n.sec,\r\nfooter,\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\nbody {\r\n  background-color: $primary-color;\r\n  font-family: 'Roboto', sans-serif;\r\n  margin: 0;\r\n  align-items: center;\r\n  padding-top: 40px;\r\n}\r\n\r\nheader {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  margin-bottom: 30px;\r\n  gap: 80px;\r\n  color: $secondary-color;\r\n  font-size: 32px;\r\n  width: 70%;\r\n  height: auto;\r\n  background-image: linear-gradient(black, rgb(39, 30, 30), gray);\r\n}\r\n\r\n.logo {\r\n  border: 2px solid $secondary-color;\r\n  width: 200px;\r\n}\r\n\r\n.head_cont {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  width: 70%;\r\n  height: 120px;\r\n}\r\n\r\n.head_size {\r\n  width: 60%;\r\n  flex-grow: 10;\r\n}\r\n\r\n.item_number {\r\n  text-decoration: underline;\r\n}\r\n\r\n.grid_container {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr 1fr 1fr;\r\n  gap: 20px;\r\n  width: 70%;\r\n  height: auto;\r\n  padding: 30px;\r\n  margin-bottom: 80px;\r\n  border: 1px solid white;\r\n  border-radius: 10px;\r\n}\r\n\r\n.grid_img {\r\n  border-radius: 5px;\r\n  width: 100%;\r\n  height: 400px;\r\n  border: 1px solid $secondary-color;\r\n}\r\n\r\n.grid_img:hover {\r\n  border: 2px solid red;\r\n}\r\n\r\n.sec {\r\n  justify-content: space-between;\r\n  width: 100%;\r\n  height: 600px;\r\n  border-radius: 8px;\r\n}\r\n\r\n.space_like {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  color: $secondary-color;\r\n  font-size: 20px;\r\n  width: 100%;\r\n  height: 80px;\r\n  margin-bottom: 0;\r\n}\r\n\r\n.like_cont {\r\n  height: auto;\r\n}\r\n\r\nbutton {\r\n  width: 60px;\r\n  height: 50px;\r\n  border-radius: 8px;\r\n  margin-bottom: 5px;\r\n}\r\n\r\n.comment {\r\n  display: flex;\r\n  width: 100%;\r\n  height: 70px;\r\n  font-size: 32px;\r\n  color: $secondary-color;\r\n  background: black;\r\n  justify-content: center;\r\n  align-items: center;\r\n  border: 2px solid $secondary-color;\r\n  border-radius: 5px;\r\n}\r\n\r\nfooter {\r\n  border-top: 2px solid $secondary-color;\r\n  width: 100%;\r\n  height: 80px;\r\n  justify-content: center;\r\n  align-items: center;\r\n  padding-left: 40px;\r\n  font-size: 20px;\r\n  color: $secondary-color;\r\n  background: black;\r\n}\r\n\r\n.modal {\r\n  display: none;\r\n  position: fixed;\r\n  z-index: 99;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow-y: scroll;\r\n  background-color: rgba(0, 0, 0, 0.9); /* darken the background */\r\n\r\n  &::-webkit-scrollbar {\r\n    width: 15px;\r\n    height: 3em; /* width of the entire scrollbar */\r\n  }\r\n\r\n  &::-webkit-scrollbar-track {\r\n    background: #e0de61; /* color of the tracking area */\r\n  }\r\n\r\n  &::-webkit-scrollbar-thumb {\r\n    background-color: rgba(255, 247, 247, 0); /* color of the scroll thumb */\r\n    border-radius: 20px; /* roundness of the scroll thumb */\r\n    border: 5px solid #743206; /* creates padding around scroll thumb */\r\n  }\r\n}\r\n\r\n.modal-content {\r\n  width: 80%;\r\n  min-height: 80%;\r\n  color: white;\r\n  background-color: #1c1919;\r\n  margin: 2% auto;\r\n  padding: 30px;\r\n  border: 1px solid #888;\r\n  border-radius: 10px;\r\n  position: relative;\r\n  overflow: auto;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 20px;\r\n\r\n  & .image-summary-frame {\r\n    display: flex;\r\n    gap: 30px;\r\n  }\r\n\r\n  & .image-frame {\r\n    display: inline-block;\r\n    border: 2px solid gainsboro;\r\n    border-radius: 3px;\r\n  }\r\n\r\n  & img {\r\n    border-radius: 3px;\r\n  }\r\n\r\n  & h1 {\r\n    margin-top: 0;\r\n  }\r\n\r\n  & ul {\r\n    width: 90%;\r\n    padding: 20px;\r\n    border-radius: 5px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    background-color: #292b2c;\r\n    gap: 10px;\r\n  }\r\n\r\n  & ul li {\r\n    display: flex;\r\n  }\r\n\r\n  & ul li dt {\r\n    width: 50px;\r\n  }\r\n\r\n  & ul li p {\r\n    margin: 0;\r\n  }\r\n\r\n  & .close-btn {\r\n    color: red;\r\n    cursor: pointer;\r\n    font-size: 2.5rem;\r\n    position: absolute;\r\n    top: 5px;\r\n    right: 20px;\r\n  }\r\n\r\n  & .comment-frame {\r\n    width: 100%;\r\n    min-height: 200px;\r\n    border: 2px solid black;\r\n    border-radius: 5px;\r\n    display: flex;\r\n    padding-bottom: 20px;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    & ul {\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: center;\r\n    }\r\n  }\r\n\r\n  & form {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: flex-start;\r\n    gap: 10px;\r\n\r\n    & input {\r\n      width: 100%;\r\n    }\r\n  }\r\n\r\n  .btn {\r\n    background-color: $secondary-color;\r\n    color: $primary-color;\r\n    border: 0;\r\n    height: 20px;\r\n    border-radius: 4px;\r\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);\r\n    font-size: 10px;\r\n    cursor: pointer;\r\n    align-self: center;\r\n\r\n    &:active {\r\n      transform: scale(0.98);\r\n    }\r\n\r\n    &:focus {\r\n      outline: 0;\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/logo5.png":
/*!******************************!*\
  !*** ./src/assets/logo5.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "logo5.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _assets_logo5_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/logo5.png */ "./src/assets/logo5.png");
/* harmony import */ var _modules_popUp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/popUp.js */ "./src/modules/popUp.js");
/* harmony import */ var _modules_getMovies_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/getMovies.js */ "./src/modules/getMovies.js");




const logo = document.getElementById('logo');
logo.src = _assets_logo5_png__WEBPACK_IMPORTED_MODULE_1__;
const container = document.querySelector('.grid_container');

// Total displayed items
const movieCount = () => document.querySelectorAll('.sec').length;
async function display(data) {
  container.innerHTML = '';
  data.forEach(item => {
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
    likeBtn.classList.add('likeBtn');
    likeBtn.dataset.id = `${item.id}`;
    likeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>';

    // like counter function
    const likes = document.createElement('div');
    const dispLikes = async () => {
      const like = await (0,_modules_getMovies_js__WEBPACK_IMPORTED_MODULE_3__.getLikes)();
      like.forEach(id => {
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
    commentBtn.addEventListener('click', () => {
      (0,_modules_popUp_js__WEBPACK_IMPORTED_MODULE_2__["default"])(item.id);
    });
    likeBtn.addEventListener('click', async () => {
      (0,_modules_getMovies_js__WEBPACK_IMPORTED_MODULE_3__.postLikes)(item.id);
      dispLikes();
    });
  });
}
async function show() {
  const showMovie = await (0,_modules_getMovies_js__WEBPACK_IMPORTED_MODULE_3__.getMovie)();
  display(showMovie);
}
show();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map