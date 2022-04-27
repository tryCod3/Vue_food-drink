import axios from "axios";

const baseUrl = 'http://localhost:3000';


export const callApi = async function (table, action, params) {
    try {
        return await axios[action](`${baseUrl}/${table}`, {params: params});
    } catch (e) {
        return false;
    }
}
