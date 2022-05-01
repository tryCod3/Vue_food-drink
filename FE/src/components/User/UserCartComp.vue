<template>
  <div class=" container p-8 mx-auto mt-12">
    <div class="w-[1200px] w-full justify-between flex overflow-x-auto">
      <div class="h-[600px] overflow-auto">
        <div class="my-2">
          <h3 class="text-xl font-bold tracking-wider">Shopping Cart {{ listCart.length }} item</h3>
        </div>
        <table class="w-full shadow-inner">
          <thead>
          <tr class="bg-gray-100">
            <th class="px-6 py-3 font-bold whitespace-nowrap">Image</th>
            <th class="px-6 py-3 font-bold whitespace-nowrap">Product</th>
            <th class="px-6 py-3 font-bold whitespace-nowrap">Qty</th>
            <th class="px-6 py-3 font-bold whitespace-nowrap">Price</th>
            <th class="px-6 py-3 font-bold whitespace-nowrap">Remove</th>
          </tr>
          </thead>
          <tbody>
          <UserCartItem
              v-for="cart in listCart"
              :key="cart.data.id"
              :id="cart.data.id"
              :image="cart.data.image"
              :name="cart.data.name"
              :price="cart.data.price"
              :count="cart.count"
              @caclTotal="caclTotal"
              @handelRemoveItem="handelRemoveItem"
          />
          </tbody>
        </table>
      </div>
      <div>
        <div class="lg:w-2/4">
          <div class="mt-4">
            <div class="px-4 py-4 rounded-md">
              <label class="font-semibold text-gray-600" for="coupon code"
              >Coupon Code</label
              >
              <input
                  class="
                  w-full
                  px-2
                  py-2
                  border border-blue-600
                  rounded-md
                  outline-none
                "
                  placeholder="coupon code"
                  type="text"
                  value="LARA#234"
              />
              <span class="block text-green-600"
              >Coupon code applied successfully</span
              >
              <button
                  class="
                  px-6
                  py-2
                  mt-2
                  text-sm text-indigo-100
                  bg-indigo-600
                  rounded-md
                  hover:bg-indigo-700
                "
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="py-4 rounded-md shadow">
            <h3 class="text-xl font-bold text-blue-600">Order Summary</h3>
            <div class="flex justify-between px-4">
              <span class="font-bold">Subtotal</span>
              <span class="font-bold">${{ total }}</span>
            </div>
            <div class="flex justify-between px-4">
              <span class="font-bold">Discount</span>
              <span class="font-bold text-red-600">- $5.00</span>
            </div>
            <div class="flex justify-between px-4">
              <span class="font-bold">Sales Tax</span>
              <span class="font-bold">$2.25</span>
            </div>
            <div
                class="
                flex
                items-center
                justify-between
                px-4
                py-2
                mt-3
                border-t-2
              "
            >
              <span class="text-xl font-bold">Total</span>
              <span class="text-2xl font-bold">${{ res }}</span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button
              class="
              w-full
              py-2
              text-center text-white
              bg-blue-500
              rounded-md
              shadow
              hover:bg-blue-600
            "
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCartItem from "@/components/User/UserCartItem";
import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";

const api = new ApiReponsitory(API_TABLE.CART)
const api_list = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "UserCartComp",
  components: {UserCartItem},
  data() {
    return {
      idUser: localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model'))?.id ?? '' : '',
      listCart: [],
      total: '0',
      res: '0'
    }
  },
  async created() {
    await api.call('get', {id: this.idUser})
    if (api.data.length > 0) {
      let dataCart = api.data[0]
      let total = 0
      for (let i = 0; i < dataCart.lists.length; i++) {
        await api_list.call('get', {id: dataCart.lists[i].idCart})
        if (api_list.data.length > 0) {
          this.listCart.push({data: api_list.data[0], count: dataCart.lists[i].count})
          total += (+api_list.data[0].price * dataCart.lists[i].count)
        }
      }
      this.caclTotal(total)
    }
  }
  ,
  methods: {
    caclTotal(data) {
      this.total = ((+this.total) + data).toFixed(3)
      this.res = this.total - (5.00 + 2.25)
      if (this.res < 0) this.res = 0
      this.res = this.res.toFixed(3)
    },
    async handelRemoveItem(id) {
      await api.call('get', this.idUser)
      if (api.data.length > 0) {
        const data = api.data[0];
        data.lists = data.lists.filter(food => food.idCart !== id)
        await api.update(data)
        this.$swal({
          title: 'Success it!',
        }).then(() => window.location.reload())
      }
    }
  }
}
</script>s

<style scoped>

</style>
