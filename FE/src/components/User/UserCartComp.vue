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
              :id="cart.data.id"
              :key="cart.data.id"
              :count="cart.count"
              :image="cart.data.image"
              :name="cart.data.name"
              :price="cart.data.price"
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
              @click="handlePay"
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
import {prefix} from "@/util";
import INFORMATION from "@/constan/information";

const api = new ApiReponsitory(API_TABLE.CART)
const api_list = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "UserCartComp",
  components: {UserCartItem},
  data() {
    return {
      listCart: [],
      total: '0',
      res: '0'
    }
  },
  computed: {
    idUser: {
      set() {
      },
      get() {
        return this.$store.getters[prefix('informationStore', INFORMATION.ID_MODEL.GET)]
      }
    },
    action: {
      set() {
      },
      get() {
        return this.$store.getters[prefix('informationStore', INFORMATION.ID_MODEL.ACTION)]
      }
    },
  },
  created() {
    this.loadApi()
  },
  methods: {
    async loadApi() {
      if (this.action === 'USER_CART' && this.idUser !== '') {
        await api._call('get', {id: this.idUser})
        if (api.data.length > 0) {
          let dataCart = api.data[0]
          let total = 0
          for (let i = 0; i < dataCart.lists.length; i++) {
            await api_list._call('get', {id: dataCart.lists[i].idCart})
            if (api_list.data.length > 0) {
              this.listCart.push({data: api_list.data[0], count: dataCart.lists[i].count})
              total += (+api_list.data[0].price * dataCart.lists[i].count)
            }
          }
          this.caclTotal({price: total, id: ''})
        }
      }
    },
    async handlePay() {
      const model = {
        id: this.idUser,
        lists: this.listCart.reduce((arr, current) => {
          arr.push({'idCart': current.data.id, 'count': current.count})
          return arr;
        }, [])
      }
      await api.update(model);
      this.$swal({
        title: 'Bạn Đã Thanh Toán Thành Công!?',
        text: "hãy chia sẻ cảm nhận của bạn!",
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#333',
        confirmButtonText: 'Share',
        cancelButtonText: 'Back',
      }).then(async res => {
        if (res.isConfirmed) {
          await this.$router.push({name: 'feed-back', params: {id: this.idUser}})
        }
      })
    },
    caclTotal(obj) {
      const {price, id} = obj
      this.total = ((+this.total) + price).toFixed(3)
      this.res = this.total - (5.00 + 2.25)
      if (this.res < 0) this.res = 0
      this.res = this.res.toFixed(3)
      if (id !== '') {
        for (let i = 0; i < this.listCart.length; i++) {
          if (this.listCart[i].data.id === id) {
            this.listCart[i].count += (price > 0 ? 1 : -1)
            break
          }
        }
      }
    },
    async handelRemoveItem(id) {
      await api._call('get', {id: this.idUser})
      if (api.data.length > 0) {
        const data = api.data[0];
        data.lists = data.lists.filter(food => food.idCart !== id)
        await api.update(data)
        this.listCart = this.listCart.filter(card => card.data.id !== id)
        this.$swal({
          title: 'Success it!',
          delay: 1000
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
