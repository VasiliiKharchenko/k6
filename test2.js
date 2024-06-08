import http from "k6/http"
import { check } from "k6";

const stand = 'https://reqres.in/api';

export const options = {
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 1,
      maxDuration: '20s',
    },
  },
  thresholds: {
    "http_req_duration": ["p(90)<100"],
}
};

export function setup(){

}
export default function(){


    let res = http.get(`${stand}/users?page=1`);
    check(res, {
        'Статус 200': (r) => r.status === 200,
        //"Users should not be auth'd. Is unauthorized header present?": (r) => r.body.indexOf("Unauthorized") !== -1,
    })

    for (let i = 0; i < res.json().data.length; i++ ) {
      let id = res.json().data[i].id;
      console.log(id);
      let res_2 = http.get(`${stand}/users?id=`+ id);
      
    }

}

export function teardown(){

}