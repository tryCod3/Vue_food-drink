<template>

  <div class="relative w-[1024px]">
    <img :src=image alt="product image" class="p-2 w-full h-full rounded-t-lg object-cover blur-sm">
    <div class="absolute bottom-0 left-0  px-5 pb-5">
      <a href="#">
        <h1 class="text-4xl mb-4 font-bold tracking-tight text-gray-900 dark:text-white truncate ...">{{ name }}</h1>
      </a>
      <div class="flex items-center  mt-2.5 mb-5">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ money() }}</span>
        <div class="ml-4 w-full flex justify-between">
          <StarComp wid="30" :ratting="ratting"/>
          <span
              class="bg-blue-100 text-center text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{{
              ratting
            }}.0</span>
        </div>
      </div>
      <p class="mb-3 text-xl tracking-tight text-gray-900 dark:text-white truncate...">{{ description }}</p>
      <div class="flex justify-between items-center">
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
import {convertVNtoUSD} from "@/util";
import StarComp from "@/components/Common/StarComp";
import {handleAddFoodInCart} from "@/util/app";

const api = new ApiReponsitory(API_TABLE.CART)

export default {
  name: "CartDetailImage",
  components: {StarComp},
  props: {
    id: String,
    name: String,
    description: String,
    price: String,
    image: String,
    ratting: Number
  },
  methods: {
    async handleAddCart() {
      await handleAddFoodInCart(api, this.$route, this.$router, this.id)
    },
    money() {
      const type = this.$i18n.t('cart.typeMoney')
      let cMoney = +this.price
      if (type === '$')
        cMoney = convertVNtoUSD(cMoney)
      return cMoney + type
    }
  }
}
</script>

<style scoped>

</style>