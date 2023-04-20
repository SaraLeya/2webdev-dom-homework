
import {listElement, commentElement, nameElement, commentsAnswer} from "./index.js";
import {loaderStart, loaderComments} from "./index.js";
import likesPlus from "./index.js";


let commentsContainer;

function apiGet() {
  fetch('https://webdev-hw-api.vercel.app/api/v1/kolesnichenko-a/comments', 
  { method: 'GET' 
})
.then ((response) => {
    return response.json();
})
    .then((response) => {
      commentsContainer = response.comments;
     
      loaderStart.style.display = 'none';
      loaderComments.style.display = 'none';

      renderscommentsContainer();
    });
}

function buttonPost() {

  fetch('https://webdev-hw-api.vercel.app/api/v1/kolesnichenko-a/comments', {
    method: 'POST',
    body: JSON.stringify({
      text: commentElement.value,
      name: nameElement.value,
      forceError: false,
    }),
    })
    .then((response) => {
      if (response.status === 500) {
        loaderComments.style.display = 'none'; 
        alert('Сервер не работает. Проверьте подключение и попробуйте еще раз');
        return Promise.reject('Сервер не работает. Проверьте подключение и попробуйте еще раз');
      } else if (response.status === 400) {
        loaderComments.style.display = 'none'; 
        alert('Мало букв');
        return Promise.reject('Мало букв');
      } else {
        loaderComments.style.display = 'block';
        return response.json();
      }
    })
 .then((response) => {
    commentElement.value = '';
    nameElement.value = '';
    apiGet();
  })
  .catch((error) => {
    if (error === 'Сервер не работает. Проверьте подключение и попробуйте еще раз') {
      console.error(error);
      return;
    }
    if (error === 'Мало букв') {
      console.error(error);
      return;
    }
    // Если не сработал ни один случай выше, то осталась ошибка сервера
    alert('Кажется, у вас сломался интернет, попробуйте позже');
    return;
  });
}

function renderscommentsContainer() {
  const commentsContainerHtml = commentsContainer
    .map((commentUser, id) => {
      return `<li data-id="${id}" class="comment">
        <div class="comment-header">
          <div>${commentUser.author.name} </div>
          <div>
            ${timeComment(commentUser.date)}
            </div>
        </div>
        <div class="comment-body">
          <div style="white-space: pre-line" class="comment-text">
            ${commentUser.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${commentUser.likes}</span>
            <button data-id="${id}" class="${
        commentUser.isLiked ? 'like-button -active-like' : 'like-button'
      }"></button>
          </div>
        </div>
      </li>`;
    })
    .join('');
  listElement.innerHTML = commentsContainerHtml;
  likesPlus();
  commentsAnswer();
}


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
  
  return myTime = day + "." + month + "." + year + " " + hour + ":" + minute ;
  }
  
  
  export {buttonPost, apiGet, commentsContainer};
  export default renderscommentsContainer;