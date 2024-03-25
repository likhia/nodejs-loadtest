import http from 'k6/http';
import { check } from 'k6';

export default function () {
    const rnd = Math.floor(Math.random() * 100000);
    const response = http.get(`http://<host>:<port>/modify?name=name_${rnd}`);
}

export let options = {
    vus: 200,
    duration: '900s',
    // thresholds: {
    //     'failed requests': ['rate<0.02'],
    //     http_req_duration: ['p(95)<500'],
    //     http_reqs: ['count>6000']
    // },
};

