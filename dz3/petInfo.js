import http from "k6/http"
import { check, group } from "k6";
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
import { generationId, generationString, generationStatusForPet } from "./random.js"

const img1 = open('images/img1.jpg', 'b');

export function petInfo(){
    const stand = 'https://petstore.swagger.io/v2/';

    let idPet = generationId();

    group("Создание питомца", function(){

        let params = {
            headers: {
                'Content-Type': 'application/json',
            },
            tags: {
                name: 'createPet',
            }
        };

        const createPetBody = {
            id: `${idPet}`,
            category: {
                id: `${generationId()}`,
                name: `${generationString()}`,
            },
            name: `${generationString()}`,
            photoUrls: [
                `${generationString()}`,
            ],
            tags: [
                {
                    id: `${generationId()}`,
                    name: `${generationString()}`,
                }
            ],
            status: `${generationStatusForPet()}`,            
        };

        let createPet = http.post(`${stand}pet`, JSON.stringify(createPetBody), params);
        let passed  = check(createPet, {
            'Статус 200': (r) => r.status === 200,       
        })
        if (!passed){
            console.log(`URL: ${stand}pet, Status: ${createPet.status}, Body: ${createPet.body}`);
        }
    });

    group("Загрузка изображения для питомца", function(){

        let fd = new FormData();
        fd.append('additionalMetadata', `${generationString}`);
        fd.append('file', http.file(img1, 'img1.jpg', 'image/jpeg'));

        let params = {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=' + fd.boundary,
            },
            tags: {
                name: 'uploadImage',
            }
        };

        let uploadImage = http.post(`${stand}pet/${idPet}/uploadImage`, fd.body(), params);
        let passed  = check(uploadImage, {
            'Статус 200': (r) => r.status === 200,       
        })
        if (!passed){
            console.log(`URL: ${stand}pet/${idPet}/uploadImage, Status: ${uploadImage.status}, Body: ${uploadImage.body}`);
        }
        fd = null;
    });
}