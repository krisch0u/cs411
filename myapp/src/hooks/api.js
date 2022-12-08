import {API_BASE_URL, API_BASE_URL2, BEARER_TOKEN} from './config';
import queryString from 'query-string';

export function get(path, queryParams) {
    const query = queryString.stringify(queryParams);
    return fetch(`${API_BASE_URL}${path}?${query}`, {
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Origin: 'localhost',
            withCredentials: true,
        }
    });
}
// issue here for the second API?

export function get(path, queryParams) {
    const query = queryString.stringify(queryParams);
    return fetch(`${API_BASE_URL2}${path}?${query}`, {
        headers: {
            'X-RapidAPI-Key': 'a6e6cb8997mshc9cc50ae76e2c3ap1c0685jsn889611677324',
            'X-RapidAPI-Host': 'nutritionix-api.p.rapidapi.com',
            Origin: 'localhost',
            withCredentials: true,
        }
    });
}