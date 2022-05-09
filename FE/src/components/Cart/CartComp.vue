<template>
  <CartFoodSlot>
    <img
        slot="cart.image"
        :src=image
        alt="icon avatar"
        class="rounded-t-lg w-full h-full  hover:skew-y-3 delay-150 duration-300 ease-in-out object-cover"
    />
    <div slot="cart.information">
      <h5
          class="text-gray-900 text-xl font-medium truncate ..."
      >
        {{ name }}
      </h5>
      <p
          class="text-gray-700 text-base mb-2 truncate ..."
      >
        {{ description }}
      </p>
      <div class=" basis-1/2 flex  font-bold text-gray-700 text-base truncate ...">
        <p>
          {{ money }}
        </p>
        <div class="flex justify-end items-end w-full">
          <svg class="h-5 w-5 hover:cursor-pointer hover:fill-amber-300" fill="none"
               stroke="currentColor" stroke-width="2"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
               @click="handleAddCart">
            <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                stroke-linecap="round"
                stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="w-full mb-5">
        <StarComp :ratting="ratting" direction="start" sz-star="4"/>
      </div>
      <div class="flex justify-between">
        <router-link :to="{name: 'cart-detail' , params: {
          location: paramLocation,
          tagItem: paramTagItem,
          id: id
        }
        }">
          <button
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              type="button"
          >
            {{ btn }}
          </button>
        </router-link>
        <template>
          <div v-if="checkThreeDot()" class="relative">
            <button class="text-black text-3xl hover:cursor-pointer" @click="toggle = !toggle">...</button>
            <div v-show="toggle" class="absolute -top-[30px] -left-[70px] bg-amber-200 rounded  text-black">
              <ul>
                <li class="px-5 hover:bg-amber-400" @click="handleUpdate">update</li>
                <li class="px-5 hover:bg-amber-400" @click="handleDelete">delete</li>
              </ul>
            </div>
          </div>
        </template>
      </div>
    </div>
  </CartFoodSlot>
</template>

<script>
import CartFoodSlot from "@/slot/CartFoodSlot";
import {convertVNtoUSD, getAccount, prefix, showModal} from "@/util";
import MODAL from "@/constan/modal";
import INFORMATION from "@/constan/information";
import StarComp from "@/components/Common/StarComp";

import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";
import {getRattingFood, getRouteParams, handleAddFoodInCart, notificationRemove} from "@/util/app";
import ROLE from "@/constan/role";

const api_cart = new ApiReponsitory(API_TABLE.CART)


export default {
  name: "CartComp",
  components: {StarComp, CartFoodSlot},
  props: {
    id: String,
    image: String,
    name: String,
    description: String,
    btn: String,
    role: String,
    createBy: String,
    price: String
  },
  async created() {
    await this.loadApiRatting()
  },
  data() {
    return {
      toggle: false,
      ratting: 0
    }
  },
  methods: {
    async loadApiRatting() {
      const api = new ApiReponsitory(API_TABLE.REVIEW)
      await getRattingFood(api, this.id).then(ratting =>
          this.ratting = ratting
      )
    },
    checkThreeDot() {
      return this.role === ROLE.ADMIN || this.createBy === this.idUser
    },
    handleUpdate() {
      this.toggle = !this.toggle;
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), this.id);
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.ACTION), "UPDATE_CART");
      showModal(MODAL.cart_update);
    },
    async handleDelete() {
      this.toggle = !this.toggle;
      await notificationRemove(this, 'deleteCart', this.id)
    },
    async handleAddCart() {
      await handleAddFoodInCart(api_cart, this.$route, this.$router, this.id)
    }
  },
  computed: {
    idUser() {
      return getAccount() ? JSON.parse(getAccount()).id : ''
    },
    paramLocation() {
      return getRouteParams(this.$route, 'location')
    },
    paramTagItem() {
      return getRouteParams(this.$route, 'tagItem')
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