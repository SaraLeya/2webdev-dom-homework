import renderscommentsContainer from "./render.js";

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
      forceError: true,
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
  
  export {buttonPost, apiGet};