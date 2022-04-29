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
        <router-link :to="{name: 'cart-detail' , params: {
          location: paramLocation,
          tagItem: paramTagItem,
          id: id
        }}">
          <button
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              type="button"
          >
            {{ btn }}
          </button>
        </router-link>
        <template>

          <div v-if="role === 'admin'" class="relative">
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
import {prefix, showModal} from "@/util";
import MODAL from "@/constan/modal";
import INFORMATION from "@/constan/information";
import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";

const api = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "CartComp.vue",
  components: {CartFoodSlot},

  props: {
    id: String,
    image: String,
    name: String,
    description: String,
    btn: String,
    role: String
  },
  data() {
    return {
      toggle: false,
    }
  },
  methods: {
    handleUpdate() {
      this.toggle = !this.toggle;
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), this.id);
      showModal(MODAL.cart_update);
    },
    async handleDelete() {
      this.toggle = !this.toggle;
      this.$swal({
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
          await api.delete(this.id);
          this.$swal({
            title: 'Success it!',
            delay: 1000
          }).then(() => window.location.reload())
        }
      })
    }
  },
  computed: {
    paramLocation: {
      set() {
      },
      get() {
        return this.$route.params?.location ?? 'da-nang'
      }
    },
    paramTagItem: {
      set() {
      },
      get() {
        return this.$route.params?.tagItem ?? 'do-an'
      }
    },
  }
}
</script>

<style scoped>

</style>