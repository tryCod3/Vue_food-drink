<template>
  <CartFoodSlot>
    <img
        slot="cart.image"
        :src=image
        alt="icon avatar"
        class="rounded-t-lg w-full h-full  hover:skew-y-3 delay-150 duration-300 ease-in-out"
    />
    <div slot="cart.information">
      <h5
          class="text-gray-900 text-xl font-medium mb-2 truncate ..."
      >
        {{ name }}
      </h5>
      <p
          class="text-gray-700 text-base mb-4 truncate ..."
      >
        {{ description }}
      </p>
      <div class="flex justify-between">
        <router-link :to="{name: 'location-item-detail-id' , params: {
          location: location.name,
          tagItem: item,
          id: id
        }}">
          <button
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              type="button"
          >
            {{ btn }}
          </button>
        </router-link>
        <img
            alt="icon setting for admin"
            class="hover:border-2  hover:rounded-full hover:border-amber-500 hover:cursor-pointer"
            src="@/assets/image/dots30.png"/>
      </div>
    </div>
  </CartFoodSlot>
</template>

<script>
import CartFoodSlot from "@/slot/CartFoodSlot";
import {prefix} from "@/util";
import INFORMATION from "@/constan/information";

export default {
  name: "CartComp.vue",
  components: {CartFoodSlot},
  props: {
    id: String,
    image: String,
    name: String,
    description: String,
    btn: String
  },
  computed: {
    location: {
      set() {
      },
      get() {
        return this.$store.getters[prefix('informationStore', INFORMATION.LOCATION.GET)]
      }
    },
    item: {
      set() {
      },
      get() {
        return this.$store.getters[prefix('informationStore', INFORMATION.ITEM.GET)]
      }
    }
  }
}
</script>

<style scoped>

</style>