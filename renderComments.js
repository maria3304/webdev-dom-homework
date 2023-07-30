
import { comments1 } from "./script.js";
import { commentsArray } from "./script.js";
export const renderComments = () => {
    const commentsHTML = commentsArray.map((comment, index) => {
      return `<li data-index="${index}" class="comment">
        <div class="comment-header">
          <div>${comment.name}</div> 
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}  
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="${comment.likeButtonClasses}"></button>
          </div>
        </div>
      </li>`;
    }).join('')
    comments1.innerHTML = commentsHTML;
    const initLikeButtonListeners = () => {
      const likeButtons = document.querySelectorAll(".like-button");
        for (const likeButton of likeButtons) {
          const index = likeButton.dataset.index;
            likeButton.addEventListener("click", (event) => {  
              event.stopPropagation();
              if (commentsArray[index].likeButtonClasses === 'like-button') {
                commentsArray[index].likes += 1;
                commentsArray[index].likeButtonClasses = 'like-button -active-like';
                renderComments();
              } else {
                commentsArray[index].likes -= 1;
                
                commentsArray[index].likeButtonClasses = 'like-button';
                renderComments();
          }
          })              
    }}
    initLikeButtonListeners();
    const initCommentListeners = () => {
      const commentButtons = document.querySelectorAll('.comment');
      for (const commentButton of commentButtons) {
        const index = commentButton.dataset.index;
        commentButton.addEventListener('click', (event) => {
          addFormText.value = '> ' + commentsArray[index].text + "\r\n" + commentsArray[index].name + ',';
        })
      }
    }
    initCommentListeners();
  };
