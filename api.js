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
        // Комменты получили - скрываем лоадеры.
        loaderStart.style.display = 'none';
        loaderComments.style.display = 'none';
  
        renderscommentsContainer();
      });
  }

function buttonPost() {
    // для управлением отображения лучше напрямую обращаться кс свойству display
    // показали лоадер
  
    fetch('https://webdev-hw-api.vercel.app/api/v1/kolesnichenko-a/comments', {
      method: 'POST',
      body: JSON.stringify({
        text: commentElement.value,
        name: nameElement.value,
        forceError: true,
      }),
      })
      .then ((response) => {
        if (response.status === 500){
          loaderComments.style.display = 'none'; //почему не работает?
          alert('Сервер не работает. Проверьте подключение и попробуйте еще раз');
          return Promise.reject('Сервер не работает. Проверьте подключение и попробуйте еще раз');
          
        } else 
        
        if (response.status === 400){
          loaderComments.style.display = 'none'; //Почему не убирает?
          alert('Мало букв');
          return Promise.reject('Мало букв');
         
      } else {
        loaderComments.style.display = 'block';
          return response.json();
        }
    }).then((response) => {
      // в этом POST-запросе данные не возвращаются. Только результат (успешно или нет)
      commentElement.value = '';
      nameElement.value = '';
      //throw new Error ('Сервер упал');
      apiGet();
    }).catch ((error) => {
    
  console.log ('ERROR');
   });
  }
  
  export {buttonPost, apiGet};