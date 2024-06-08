import http from "k6/http";
import { check, group } from "k6";

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
  },
};

export function setup() {
  // Функция setup выполняется один раз перед началом теста
}

export default function() {
  let res = http.get(`${stand}/users?page=1`);
  check(res, {
    'Статус 200': (r) => r.status === 200,
  });

  let userIds = res.json().data.map(user => user.id);
  let requests = userIds.map(id => ({
    method: 'GET',
    url: `${stand}/users?id=${id}`,
  }));

  let responses = http.batch(requests);
  responses.forEach((res, index) => {
    check(res, {
      [`User ${userIds[index]} status 200`]: (r) => r.status === 200,
    });
  });
}

export function teardown() {
  // Функция teardown выполняется один раз после завершения всех тестов
}
