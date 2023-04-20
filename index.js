import {buttonPost, apiGet, commentsContainer} from "./api.js";
import renderscommentsContainer from "./api.js";

let buttonElement = document.getElementById('buttonComent');
export const listElement = document.getElementById('list');
export const nameElement = document.getElementById('inputName');
export const commentElement = document.getElementById('inputComment');
const likesContainerElement = document.getElementById('.likes-counter');
//const addForm = document.querySelectorAll('.add-form');
const addForm = document.getElementById('add-form');
export const loaderStart = document.querySelector('.loaderStart');
export const loaderComments = document.querySelector('.loaderComments');

// Сразу же скрываем его, так комментарий пока никто не публикует
loaderComments.style.display = 'none';

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


export default likesPlus;
export {commentsAnswer};