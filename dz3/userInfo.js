import http from "k6/http"
import { check, group } from "k6";
import { generationId, generationString, generationPhone } from "./random.js"

export function userInfo(){
    const stand = 'https://petstore.swagger.io/v2/';

    let username = generationString();

    group("Создание пользователя", function(){

        let params = {
            headers: {
                'Content-Type': 'application/json',
            },
            tags: {
                name: 'createUser',
            }
        };

        const createUserBody = {
            id: `${generationId()}`,
            username: `${username}`,
            firstname: `${generationString()}`,
            lastname: `${generationString()}`,
            email: `${generationString()}@gmail.com`,
            password: `${generationString()}`,
            phone: `${generationPhone()}`, //на счёт кодов абонентов не заморачивался
            userstatus: 0,
        }

        let createUser = http.post(`${stand}user`, JSON.stringify(createUserBody), params);
        let passed  = check(createUser, {
            'Статус 200': (r) => r.status === 200,   
        })
        if (!passed){
            console.log(`URL: ${stand}user (post), Status: ${createUser.status}, Body: ${createUser.body}`);
        }
    });

    group("Информация о пользователе", function(){

        let tag ={
            tags: {
              name: 'infoUser',
            }
        };

        let infoUser = http.get(`${stand}user/${username}`, tag);
        let passed  = check(infoUser, {
            'Статус 200': (r) => r.status === 200,       
        })
        if (!passed){
            console.log(`URL: ${stand}user/${username} (get), Status: ${infoUser.status}, Body: ${infoUser.body}`);
        }
    });

    group("Удаление пользователя", function(){

        let tag ={
            tags: {
              name: `DeleteUser`,
            }
        };

        let deleteUser = http.del(`${stand}user/${username}`, tag);
        let passed  = check(deleteUser, {
            'Статус 200': (r) => r.status === 200,       
        })
        if (!passed){
            console.log(`URL: ${stand}user/${username} (delete), Status: ${deleteUser.status}, Body: ${deleteUser.body}`);
        }
    });
}