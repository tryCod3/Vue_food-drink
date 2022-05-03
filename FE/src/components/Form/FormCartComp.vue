<template>
  <div class="w-[900px] p-5 flex   rounded shadow-2xl">
    <div class="mt-[110px] w-[400px] h-[200px] flex items-center justify-center ">
      <img alt="imag"
           class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
           :src="food.image !== '' ? food.image : 'https://cdn2.momjunction.com/wp-content/uploads/2020/12/Interesting-Food-Trivia-Questions-For-Kids-With-Answers-910x1024.jpg'">
    </div>
    <div class="w-full">
      <div class="px-6 py-4">

        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-black" for="default-inputimg">Image</label>
          <input id="default-inputimg"
                 v-model="food.image"
                 class="bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                 placeholder="link image..."
                 type="text">
        </div>

        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-black" for="default-input1">Name</label>
          <input id="default-input1"
                 v-model="food.name"
                 class="bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                 placeholder="name..."
                 type="text">
        </div>

        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-black" for="default-input2">Description</label>
          <textarea id="default-input2" v-model="food.description"
                    class="min-h-[100px] bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
               dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                    placeholder="description..."
                    type="text"/>
        </div>


        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-black" for="default-input3">Location</label>
          <input id="default-input3"
                 v-model="food.location"
                 class="bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                 placeholder="location..."
                 type="text">
          <div class="flex justify-center">
            <select class="text-black" v-model="food.signLocation">
              <option value="da-nang">Đà Nẵng</option>
              <option value="ho-chi-minh">Hồ Chí Minh</option>
              <option value="ha-noi">Hà Nội</option>
            </select>
          </div>
        </div>


        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-black" for="default-input4">Price</label>
          <input id="default-input4"
                 v-model="food.price"
                 class="bg-gray-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                 placeholder="price..."
                 type="number">
        </div>

        <div>

          <label class="block mb-2 text-sm font-medium text-black" for="default-input5">Tags</label>
        </div>
        <div class="mb-6 flex justify-around flex-wrap">
          <div v-for="tag in this.$i18n.t('header.listsFood')" :key="tag">
            <input :value=convertType(tag) v-model="food.tags" name="list-tags" type="checkbox">
            <label>{{ tag }}</label><br>
          </div>
        </div>
      </div>

      <div class="px-6 pt-4 pb-2">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                @click="isUpdate ? handleUpdateCart() : handleAddCart()">
          {{ isUpdate ? "update" : "add" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import {coverRoute, genId, prefix, turnOffModal} from "@/util";
import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";
import INFORMATION from "@/constan/information";
import MODAL from "@/constan/modal";

const api = new ApiReponsitory(API_TABLE.LIST);

export default {
  name: "FormCartComp",
  props: {
    isUpdate: {type: Boolean, default: false}
  },
  data() {
    return {
      food: {
        image: '',
        name: '',
        description: '',
        location: '',
        signLocation: 'da-nang',
        price: '',
        tags: [],
      }
    }
  }
  ,
  methods: {
    async handleAddCart() {
      this.createAt = Date.now();
      this.food.id = genId("list-")
      this.food.createBy = this.idUser
      await api.add(this.food)
      this.$swal({
        title: 'Add cart success!',
        delay: 1000,
      })
    },
    async handleUpdateCart() {
      await api.update(this.food);
      await this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), '');
      await this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.ACTION), '');
      turnOffModal(MODAL.cart_update);
      this.$swal({
        title: 'Update cart success!',
        delay: 1000,
      }).then(() => window.location.reload())
    }
    ,
    async getDataApi() {
      console.log(this.action, this.id)
      if (this.action === 'UPDATE_CART' && this.isUpdate && this.id !== '') {
        const params = {id: this.id};
        await api.call('get', params);
        this.food = api.data[0];
      }
    }
    , convertType(name) {
      return coverRoute(name);
    }
  },
  computed: {
    idUser() {
      return localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model')).id : ''
    },
    id: {
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
    }
  },
  watch: {
    id: {
      immediate: true,
      deep: true,
      handler: 'getDataApi'
    }
  }
}
</script>

<style scoped>

</style>