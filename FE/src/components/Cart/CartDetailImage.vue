<template>

  <div class="basis-3/4">
    <img :src=image alt="product image" class="p-2 w-full rounded-t-lg object-contain">
    <div class="px-5 pb-5">
      <a href="#">
        <h1 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate ...">{{ name }}</h1>
        <p class="text-xl tracking-tight text-gray-900 dark:text-white truncate...">{{ description }}</p>
      </a>
      <div class="flex items-center mt-2.5 mb-5">
        <div class="flex justify-center">
          <button v-for="i in 5" :key="i" :class="{ 'mr-1': i < 5 }">
            <svg :class="[ ratting >= i ? 'text-amber-400': 'text-white']" class="block h-8 w-8"
                 fill="currentColor"
                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          </button>
        </div>
        <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ price }}$</span>
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="handleAddCart">
          {{ this.$i18n.t('cart.btnAdd') }}
        </button>
      </div>
    </div>

  </div>

</template>

<script>

import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";
import {toast} from "@/util";

const api = new ApiReponsitory(API_TABLE.CART)

export default {
  name: "CartDetailImage",
  props: {
    name: String,
    description: String,
    price: String,
    image: String,
    ratting: Number
  },
  methods: {
    async handleAddCart() {
      const getId = localStorage.getItem("model") ? JSON.parse(localStorage.getItem("model"))?.id ?? '' : ''
      const getCartId = this.$route.params.id
      if (getId === '') {
        await this.$router.push({name: 'user-login'})
      } else {
        await api.call('get', {id: getId})

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
  }
}
</script>

<style scoped>

</style>