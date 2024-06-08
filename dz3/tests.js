import { userInfo } from "./userInfo.js"
import { petInfo } from "./petInfo.js"
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { sleep } from "k6";

export const options = {
    scenarios: {
        checkUserInfo: {
        exec: "checkUserInfo",
        executor: 'constant-arrival-rate',
        duration: '5s',
        rate: 1,
        timeUnit: '1s',
        preAllocatedVUs: 10,
      },
      checkPetInfo: {
        exec: "checkPetInfo",
        executor: 'constant-arrival-rate',
        duration: '5s',
        rate: 1,
        timeUnit: '1s',
        preAllocatedVUs: 10,
      }
    },
      thresholds: {
        "http_req_duration": ["p(90)<1000"],
        "http_req_duration{group:::Создание пользователя}": ["p(90)<1000"],
        "http_req_duration{group:::Создание питомца}": ["p(90)<1000"],
        "http_req_duration{group:::Загрузка изображения для питомца}": ["p(90)<1000"],
        "http_req_duration{group:::Информация о пользователе}": ["p(90)<1000"],
        "http_req_duration{group:::Удаление пользователя}": ["p(90)<1000"],
        "http_req_failed": ["rate===0"],
        "http_req_failed{group:::Создание пользователя}": ["rate===0"],
        "http_req_failed{group:::Создание питомца}": ["rate===0"],
        "http_req_failed{group:::Загрузка изображения для питомца}": ["rate===0"],
        "http_req_failed{group:::Информация о пользователе}": ["rate===0"],
        "http_req_failed{group:::Удаление пользователя}": ["rate===0"],
      }
    };

    export function checkUserInfo(){
        userInfo();
        sleep(randomIntBetween(1, 3)); //с этим Executor он слип ставит только на последней итерации, настройки внутри Executor приоритетнее
    }

    export function checkPetInfo(){
        petInfo();
        sleep(randomIntBetween(1, 3));
    }