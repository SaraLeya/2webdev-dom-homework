import {buttonPost, apiGet} from "./api.js";
import renderscommentsContainer from "./render.js";

let buttonElement = document.getElementById('buttonComent');
const listElement = document.getElementById('list');
const nameElement = document.getElementById('inputName');
const commentElement = document.getElementById('inputComment');
const likesContainerElement = document.getElementById('.likes-counter');
//const addForm = document.querySelectorAll('.add-form');
const addForm = document.getElementById('add-form');
const loaderStart = document.querySelector('.loaderStart');
const loaderComments = document.querySelector('.loaderComments');

// Сразу же скрываем его, так комментарий пока никто не публикует
loaderComments.style.display = 'none';

let commentsContainer;

apiGet();

function likesPlus() {
  const heartsElement = document.querySelectorAll('.like-button');

  for (const heartElement of heartsElement) {
    heartElement.addEventListener('click', (event) => {
      event.stopPropagation();
      const id = heartElement.dataset.id;
      if (commentsContainer[id].isLiked === false) {
        commentsContainer[id].isLiked = true;
        commentsContainer[id].likes += 1;
      } else if (commentsContainer[id].isLiked === true) {
        commentsContainer[id].isLiked = false;
        commentsContainer[id].likes -= 1;
      }
      renderscommentsContainer();
    });
  }
}
likesPlus();


function commentsAnswer() {
  const commentsAnswer = document.querySelectorAll('.comment');
  for (const commentAnswer of commentsAnswer) {
    commentAnswer.addEventListener('click', () => {
      const index = commentAnswer.dataset.id;
      commentElement.value =
        '>' + commentsContainer[index].text + ' ' + commentsContainer[index].author.name + ',';
    });
  }
}

buttonElement.addEventListener('click', () => {
  nameElement.classList.remove('error');
  if (nameElement.value === '' || commentElement.value === '') {
    nameElement.classList.add('error');
    commentElement.classList.add('error');
    return;
  }
  buttonPost();
});

function timeComment () {
let myTime = 0;
let myDate = new Date();
let day = myDate.getDate();
let month = myDate.getMonth();
let year = myDate.getFullYear();
let hour = myDate.getHours();
let minute = myDate.getMinutes();

if (day < 10) {
 day = "0" + day;
}
if (month < 10) {
 month = "0" + month;
}
 if (minute < 10) {
  minute = "0" + minute;
 }

myTime = day + "." + month + "." + year + " " + hour + ":" + minute ;
}
//timeComment ();