<template>
  <tr>
    <td>
      <div class="flex justify-center">
        <img
            :src="image"
            alt="image"
            class="object-cover h-28 w-28 rounded-2xl"
        />
      </div>
    </td>
    <td class="p-4 px-6 text-center whitespace-nowrap">
      <div class="flex flex-col items-center justify-center">
        <h3>{{ name }}</h3>
      </div>
    </td>
    <td class="p-4 px-6 text-center whitespace-nowrap">
      <div>
        <button @click="handleCount('sub')">
          <svg
              class="inline-flex w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            />
          </svg>
        </button>
        <input
            v-model="countItem"
            class="w-12 text-center bg-gray-100 outline-none"
            name="qty"
            type="text"
        />
        <button @click="handleCount('add')">
          <svg
              class="inline-flex w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            />
          </svg>
        </button>
      </div>
    </td>
    <td class="p-4 px-6 text-center whitespace-nowrap">${{ price }}</td>
    <td class="p-4 px-6 text-center whitespace-nowrap">
      <button @click=handelRemoveItem>
        <svg
            class="w-6 h-6 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
          />
        </svg>
      </button>
    </td>
  </tr>
</template>

<script>

import {toast} from "@/util";

export default {
  name: "UserCartItem",
  props: {
    name: String,
    image: String,
    count: Number,
    price: String,
    id: String,
  },
  data() {
    return {
      countItem: '0',
      total: '0'
    }
  },
  created() {
    this.countItem = this.count.toString()
    this.total = this.countItem * (+this.price)
  },
  methods: {
    handleCount(action) {
      if (action === 'add') {
        this.countItem = String(+this.countItem + 1)
        this.$emit("caclTotal", {price: +this.price, id: this.id})
      } else {
        if (this.countItem !== '1') {
          this.countItem = String(+this.countItem - 1)
          this.$emit("caclTotal", {price: -this.price, id: this.id})
        } else
          toast("Mặt hàng không thể nhỏ hơn 1!")
      }
    },
    async handelRemoveItem() {
      this.$emit('handelRemoveItem', this.id)
    }
  }
}
</script>

<style scoped>

</style>