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

