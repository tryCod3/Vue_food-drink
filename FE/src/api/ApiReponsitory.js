import {TABLE_WITH_KEYS} from "@/constan/api";
import {addApi, callApi, deleteApi, updateApi} from '@/api/config'


export const ApiReponsitory = function (nameTable) {
    if (!TABLE_WITH_KEYS.includes(nameTable)) {
        throw Error(`${nameTable} not correct! , check table db again!`);
    }
    this.nameTable = nameTable;
    this.loading = false;
    this.data = null
}

ApiReponsitory.prototype.call = async function (action, params) {
    if (this.loading) return;
    this.loading = true;
    const api = await callApi(this.nameTable, action, params);
    this.loading = false;
    this.data = api.data;
    return Object.getPrototypeOf(this);
}

ApiReponsitory.prototype._filter = async function (fn) {
    if (this.loading || !this.data) return;
    this.data = this.data.filter(item => fn(item))
    return Object.getPrototypeOf(this);
}

ApiReponsitory.prototype.add = async function (model) {
    if (this.loading || !model) return false;
    return await addApi(this.nameTable, model);
}

ApiReponsitory.prototype.update = async function (model) {
    if (this.loading || !model) return false;
    return await updateApi(this.nameTable, model);
}

ApiReponsitory.prototype.delete = async function (id) {
    if (this.loading) return false;
    return await deleteApi(this.nameTable, id);
}
