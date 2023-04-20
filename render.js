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

  export default renderscommentsContainer;