import {uuid} from 'vue-uuid';
import app from '@/main'

export const log = function (name) {

    function show(mess) {
        console.log(`[${name}: ] ${mess}`)
    }

    return show;
}

export const genId = (pre) => {
    return pre + uuid.v1();
}

export const prefix = (pre, action) => {
    return `${pre}/${action}`
}

export const convertVNtoUSD = (vnd) => {
    return (vnd / 22.955).toFixed(3)
}

export const toast = (message) => {
    app.$toasted.show(message, {
        delay: 1000,
        duration: 3000,
        icon: 'check',
        position: 'top-right',
        theme: 'bubble',
    })
}

const mapper = (key) => {
    key = key.toLowerCase()
    if (key === 'food') {
        return 'do-an'
    }
    if (key === 'fresh') {
        return 'thuc-pham'
    }
    if (key === 'beer') {
        return 'bia'
    }
    if (key === 'flower') {
        return 'hoa'
    }
    if (key === 'mart') {
        return 'sieu-thi'
    }
    if (key === 'medicine') {
        return 'thuoc'
    }
    return key;
}

function convertViToEn(str, toUpperCase = false) {
    str = mapper(str)
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return toUpperCase ? str.toUpperCase() : str;
}

export const coverRoute = function (name) {
    const newName = convertViToEn(name);
    return newName.split(' ').join('-');
}

export const showModal = function (target) {
    const modal = document.getElementById(`${target}`)
    if (modal)
        modal.style.display = 'block'
}

export const turnOffModal = function (tagModal) {
    const modal = document.getElementById(`${tagModal}`)
    if (modal)
        modal.style.display = 'none'
}

export const getAccount = () => {
    return localStorage.getItem('model')
}