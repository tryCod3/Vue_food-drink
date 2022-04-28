import axios from "axios";
import {log} from "@/util";

const logger = log('API')

const baseUrl = 'http://localhost:3000';


export const callApi = async function (table, action, params) {
    try {
        return await axios[action](`${baseUrl}/${table}`, {params: params});
    } catch (e) {
        logger('callApi: ' + e.message);
        return false;
    }
}

export const addApi = async function (table, model) {
    try {
        return await axios['post'](`${baseUrl}/${table}`, model);
    } catch (e) {
        logger('addApi: ' + e.message);
        return false
    }
}

export const updateApi = async function (table, model) {
    try {
        return await axios['put'](`${baseUrl}/${table}/${model.id}`, model);
    } catch (e) {
        logger('updateApi: ' + e.message);
        return false
    }
}

export const deleteApi = async function (table, id) {
    try {
        return await axios['delete'](`${baseUrl}/${table}/${id}`);
    } catch (e) {
        logger('deleteApi: ' + e.message);
        return false
    }
}