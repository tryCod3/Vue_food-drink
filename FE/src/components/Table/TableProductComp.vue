<template>
  <div class="relative">
    <div class="p-4">
      <label class="sr-only" for="table-search">Search</label>
      <div class="relative mt-1">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  fill-rule="evenodd"></path>
          </svg>
        </div>
        <input id="table-search"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Search for items"
               v-model="search"
               type="text">
      </div>
    </div>
    <div class="relative overflow-auto h-[630px] shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="px-6 py-3" scope="col">
            id
          </th>
          <th class="px-6 py-3" scope="col">
            image
          </th>
          <th class="px-6 py-3" scope="col">
            name
          </th>
          <th class="px-6 py-3" scope="col">
            location
          </th>
          <th class="px-6 py-3" scope="col">
            price
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in lists" :key="product.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ product.id }}</td>
          <td class="px-6 py-4 ">
            <img width="100px" height="100px" class="rounded-full" :src="product.image" alt="img product">
          </td>
          <td class="px-6 py-4">{{ product.name }}</td>
          <td class="px-6 py-4">{{ product.location }}</td>
          <td class="px-6 py-4">{{ product.price }}</td>
          <td class="px-6 py-4 text-right">
            <a @click="showUpdate(product.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Update</a>
            |
            <a @click="handleDelete(product.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="absolute top-[39px] right-[210px] flex justify-between w-[500px]">
      <div class="flex items-center">
        <input v-model="tags" type="checkbox" :value="coverType('all')"/>
        <p>all</p>
      </div>
      <div class="flex items-center" v-for="tag in listTags" :key="tag">
        <input v-model="tags" type="checkbox" :value="coverType(tag)"/>
        <p>{{ tag }}</p>
      </div>
    </div>
    <div class="absolute top-[10px] right-[240px] flex justify-between w-[500px]">
      <div class="flex items-center" v-for="loc in listLocations" :key="loc">
        <input v-model="location" type="radio" :value="loc === 'all' ? '' : coverType(loc)"/>
        <p>{{ loc }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";
import {coverRoute, prefix, showModal} from "@/util";
import MODAL from "@/constan/modal";
import INFORMATION from "@/constan/information";

const api = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "TableProductComp",
  created() {
    this.loadApi()
  },
  data() {
    return {
      listProduct: [],
      listTags: this.$i18n.t('header.listsFood'),
      listLocations: ['all', 'Đà Nẵng', 'Hồ Chí Minh', 'Hà Nội'],
      tags: ['all'],
      location: '',
      search: ''
    }
  },
  methods: {
    async loadApi() {
      await api._call('get', {})
      this.listProduct = api.data
    },
    coverType(name) {
      return coverRoute(name)
    },
    showUpdate(id) {
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), id);
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.ACTION), 'UPDATE_CART');
      showModal(MODAL.cart_update)
    },
    async handleDelete(id) {
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
          await api.delete(id);
          this.listProduct = this.listProduct.filter(product => product.id !== id)
          this.$swal({
            title: 'Success it!',
            delay: 1000
          })
        }
      })
    },
  },
  computed: {
    lists() {
      const list = [...this.listProduct].filter(product => product.name.toLowerCase().includes(this.search.toLowerCase()))
      if (this.location === '') {
        if (this.tags.includes('all')) return list;
        else {
          return list.filter(product => product.tags.some(item => this.tags.includes(item)))
        }
      }
      if (this.tags.includes('all')) {
        return list.filter(product => product.signLocation === this.location)
      }
      return list.filter(product => product.tags.some(item => this.tags.includes(item))).filter(product => product.signLocation === this.location)
    }
  }
}
</script>

<style scoped>

</style>