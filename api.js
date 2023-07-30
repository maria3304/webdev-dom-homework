import { addFormName } from "./script.js";
import { addFormText } from "./script.js";

export const fetchAndRenderComments = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/:maria-nevshupa/comments", {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
};

export const getFetch = () => {
  return fetch(
    'https://wedev-api.sky.pro/api/v1/:maria-nevshupa/comments',
    {
      method: 'POST',
      body: JSON.stringify({
        name: addFormName.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
        text: addFormText.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
        //forceError: true, 
      }),
    })
    .then((response) => {
      if(response.status === 500) {
        a += 1;
        alert('Сервер сломался, попробуй позже');
      // throw new Error("Сервер упал");
        return Promise.reject('Сервер упал');
    } else if (response.status === 400){
      alert('Имя и комментарий должны быть от 3х символов'); 
    } else {
      return response.json();
    };
  });
};