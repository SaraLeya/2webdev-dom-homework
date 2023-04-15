let buttonElement = document.getElementById('buttonComent');
const listElement = document.getElementById('list');
const nameElement = document.getElementById('inputName');
const commentElement = document.getElementById('inputComment');
const likesContainerElement = document.getElementById('.likes-counter');
const addForm = document.getElementById('add-form');
const loaderStart = document.querySelector('.loaderStart');
const loaderComments = document.querySelector('.loaderComments');

// скрываем лоадер коментария
loaderComments.style.display = 'none';

let commentsContainer;

function apiGet() {
  fetch('https://webdev-hw-api.vercel.app/api/v1/kolesnichenko-a/comments', { method: 'GET' })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      commentsContainer = response.comments;
      // Комменты получили - скрываем лоадеры
      loaderStart.style.display = 'none';
      loaderComments.style.display = 'none';

      renderscommentsContainer();
    });
}

apiGet();

function renderscommentsContainer() {
  const commentsContainerHtml = commentsContainer
    .map((commentUser, id) => {
      return `<li data-id="${id}" class="comment">
        <div class="comment-header">
          <div>${commentUser.author.name} </div>
          <div>
            ${commentUser.date}
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

//function timeComment () {
//let myTime = 0;
//let myDate = new Date();
//let day = myDate.getDate();
//let month = myDate.getMonth();
//let year = myDate.getFullYear();
//let hour = myDate.getHours();
//let minute = myDate.getMinutes();

//if (day < 10) {
// day = "0" + day;
//}
//if (month < 10) {
// month = "0" + month;
//}
// if (minute < 10) {
//  minute = "0" + minute;
// }

//myTime = day + "." + month + "." + year + " " + hour + ":" + minute ;
//t = myTime;
//console.log(t);
//}
//timeComment ();

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

function buttonPost() {
  loaderComments.style.display = 'block';

  fetch('https://webdev-hw-api.vercel.app/api/v1/kolesnichenko-a/comments', {
    method: 'POST',
    body: JSON.stringify({
      text: commentElement.value,
      name: nameElement.value,
    }),
  }).then((response) => {
    // в этом POST-запросе данные не возвращаются. 
    //Только результат (успешно или нет)
    commentElement.value = '';
    nameElement.value = '';
    // управление лоадером в функции apiGet()
    apiGet();
  });
}
