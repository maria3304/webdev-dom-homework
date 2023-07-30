"use strict";

import { renderComments } from "./renderComments.js";
import { fetchAndRenderComments } from "./api.js";
import { getFetch } from "./api.js";
//import { commentsArray } from "./renderComments.js";

export const comments1 = document.getElementById("comments");
const addFormButton = document.querySelector(".add-form-button");
export const addFormName = document.querySelector(".add-form-name");
export const addFormText = document.querySelector(".add-form-text");
const likesCounterElements = document.querySelectorAll('.likes-counter');

const addForm = document.querySelector(".add-form");
export let commentsArray = [];




fetchAndRenderComments().then((responseData) => {
  console.log(responseData);
  commentsArray = responseData.comments.map((comment) => {
    let now = new Date(comment.date);
    let data = (now.getDate() + "." + 0 + (Number(now.getMonth()) + 1) + "." + (Number(now.getFullYear()) - 2000) + " " + now.getHours() + ":" + now.getMinutes());
    console.log(now);
    return {
      name:comment.author.name,
      date: data,
      text: comment.text,
      likes: comment.likes,
      //isLiked: false,
      likeButtonClasses: 'like-button',
    };
  });
  renderComments();
});



fetchAndRenderComments();

export const initLikeButtonListeners = () => {
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

export const initCommentListeners = () => {
  const commentButtons = document.querySelectorAll('.comment');
  for (const commentButton of commentButtons) {
    const index = commentButton.dataset.index;
    commentButton.addEventListener('click', (event) => {
      addFormText.value = '> ' + commentsArray[index].text + "\r\n" + commentsArray[index].name + ',';
    })
  }
}

addFormButton.addEventListener("click", () => {
  let a = 0;
  addFormName.style.backgroundColor = '';
  addFormText.style.backgroundColor = '';
  let OneTimeAddFormName = addFormName.value.length;
  let OneTimeAddFormText = addFormText.value.length;
  console.log(OneTimeAddFormName);

  if (addFormName.value === "") {
    addFormName.style.backgroundColor = 'red';
    return;
  } else if (addFormText.value === "") {
    addFormText.style.backgroundColor = 'red';
    return;
  } else {
    addFormButton.disabled = true;
    addFormButton.textContent = 'Элемент добавляется...';
    getFetch().then(() => {
      return fetchAndRenderComments();
      }).then((data) => {
        addFormButton.disabled = false;
        addFormButton.textContent = 'Добавить';  
        if(OneTimeAddFormName >= 3 && OneTimeAddFormText >= 3 ) {
          addFormName.value = "";
          addFormText.value = "";
        }
      }).then(() => {
        location.reload();
      })
      .catch((error) => {
        addFormButton.disabled = false;
        addFormButton.textContent = 'Добавить';
        if(a < 1) {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        };
        a = 0;
        console.warn(error);
      });
      // .then((responseData) => {
      //     console.log(responseData);
      //     // commentsArray = responseData.comments;
      //     console.log(commentsArray);
      //     renderComments();
      //   });
      };
  
  //getFetch();
  //renderComments();
  
});