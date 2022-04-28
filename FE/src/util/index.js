import {uuid} from 'vue-uuid';


export const log = function (name) {

    function show(mess) {
        console.log(`[${name}: ] ${mess}`)
    }

    return show;
}

export const genId = (pre) => {
    return prefix(pre, uuid.v1());
}

export const prefix = (pre, action) => {
    return `${pre}/${action}`
}

function convertViToEn(str, toUpperCase = false) {
    str = str.toLowerCase();
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