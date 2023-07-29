
import { comments1 } from "./script.js";
import { initLikeButtonListeners } from "./script.js";
import {initCommentListeners} from "./script.js";
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
    initLikeButtonListeners();
    initCommentListeners();
  };
