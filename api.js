import { addFormName } from "./script.js";
import { addFormText } from "./script.js";

const host = "https://wedev-api.sky.pro/api/v2/:maria-nevshupa"

export const fetchAndRenderComments = () => {
    return fetch(host, {
    method: "GET",
    headers: {
      Authorization: "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck"
    },
  }).then((response) => {
    return response.json();
  });
};

export const getFetch = () => {
  return fetch(
    host,
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