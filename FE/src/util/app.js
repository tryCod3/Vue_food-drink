import app from '@/main'
import {params} from "@/constan/router";
import {getAccount, toast} from "@/util/index";


export const remove = async (api, list, id = '') => {
    await api.delete(id);
    list = list.filter(food => food.id !== id);
    app.$swal({
        title: 'Success it!',
        delay: 1000
    })
    return list;
}

export const notificationRemove = async (instance, method, data) => {
    if (instance) {
        instance.$swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async res => {
            if (res.isConfirmed) {
                instance.$emit(method, data)
            }
        })
    }
}

export const getRouteParams = (route, slug) => {
    return params(route)[slug]
}

export const getRattingFood = async (api, idFood) => {
    let ratting = 0
    await api._call('get', {replyFood: idFood})
    for (let i = 0; i < api.data?.length; i++) {
        ratting += api.data[i].ratting;
    }
    if (api.data?.length)
        ratting /= api.data.length;
    console.log(api.data, idFood, ratting)
    return ratting
}


export const handleAddFoodInCart = async (api, route, router, idCart = '') => {
    const getId = getAccount() ? JSON.parse(getAccount()).id : ''
    const getCartId = idCart
    if (getId === '') {
        await router.push({name: 'user-login'})
    } else {
        await api._call('get', {id: getId})

        if (api.data.length === 0) { // user chưa bao giờ mua hàng , hãy tạo nó
            await api.add({
                id: getId,
                lists: [{
                    idCart: getCartId,
                    count: 1
                }]
            })
        } else {

            // get db Cart with id user , and update count
            const data = api.data[0]

            let hasItem = false

            data.lists = data.lists.reduce((arr, current) => {
                if (current.idCart === getCartId) {
                    hasItem = true
                    arr.push({idCart: current.idCart, count: current.count + 1});
                } else {
                    arr.push(current)
                }
                return arr
            }, [])

            if (!hasItem) { // chưa có mặt hàng này trong giỏ hàng của user
                data.lists.push({
                    idCart: getCartId,
                    count: 1
                })
            }

            // updaet db
            await api.update(data)
        }

        toast("Thêm danh mặt hàng thành công!")
    }
}