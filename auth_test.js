import http from "k6/http"
import { check, group } from "k6";

const stand = 'https://reqres.in/api';

export const options = {
    scenarios: {
      contacts: {
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
        maxDuration: '30s',
      },
    },
      thresholds: {
          "http_req_duration{group:::авторизация}": ["p(90)<100"],
      }
    };


export function setup(){

}
export default function(){

    group("авторизация", function(){
        // let res = http.get(`${stand}/users?page=1`);
        // check(res, {
        //     'Статус 200': (r) => r.status === 200,
        //     "Users should not be auth'd. Is unauthorized header present?": (r) => r.body.indexOf("Unauthorized") !== -1,
        // })
        // let user = res.json().data[0].email
        // console.log(user);

        const credentials = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
        };
        let header ={
            'Content-Type': 'application/json',
        }

        let loginRes = http.post(stand + '/login', JSON.stringify(credentials), {headers: header});
        console.log(loginRes.body)

        let authToken = loginRes.json().token

        let authHeaders ={
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
        }
        }
        let res3 = http.get(stand + '/users/2', authHeaders)

        check(loginRes, {
            'login successful': (res) => res.status === 200
        });

    })

    let res = http.get("http://test.k6.io/my_messages.php");
        check(res, {
        "Users should not be auth'd. Is unauthorized header present?": (r) => r.body.indexOf("Unauthorized") !== -1
        });
    console.log(res.body);

    let csrftoken2 = res.html().find("input[name=csrftoken]").first().attr("value");
    console.log("csrftoken = " + csrftoken2)

    let username = "admin"
    let password = "123"

    const authBody = {
        login: `${username}`,
        password: `${password}`,
        redir: '1',
        csrftoken: `${csrftoken2}`,
    };

    let auth = http.post("http://test.k6.io/login.php", authBody)
        check(auth, {
            "is logged in welcome header present": (r) => r.body.indexOf("Welcome, admin!") !== -1
        });
}

export function teardown(){


}