<template>
  <div>
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
            user name
          </th>
          <th class="px-6 py-3" scope="col">
            count cart
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in lists" :key="user.data.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ user.data.id }}</td>
          <td class="px-6 py-4">{{ user.data.user }}</td>
          <td class="px-6 py-4">{{ user.count }}</td>
          <td class="px-6 py-4 text-right">
            <export-excel
                :data="user.lists"
                :fields="excel.header"
                worksheet="My Worksheet"
                name="filename.xls"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">
              Export Excel
            </export-excel>
            <button @click="handleDelete(user.idCart)"
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";

const api = new ApiReponsitory(API_TABLE.CART)
const api_user = new ApiReponsitory(API_TABLE.ACCOUNT)
const api_list = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "TableCardOrderComp",
  created() {
    this.loadApi()
  },
  data() {
    return {
      listUser: [],
      search: '',
      excel: {
        listData: [],
        header: {
          'id': 'id',
          'name': 'name',
          'location': 'location',
          'signLocation': 'signLocation',
          'price': 'price',
          'image': 'image',
          'tags': 'tags',
          'createBy': 'createBy'
        }
      }
    }
  },
  methods: {
    async loadApi() {
      await api.call('get', {})
      for (let i = 0; i < api.data.length; i++) {
        await api_user.call('get', {id: api.data[i].id})
        const sumCart = api.data[i].lists.reduce((sum, current) => {
          return sum + current.count;
        }, 0);
        if (api_user.data.length > 0) {
          const arr = []
          for (let j = 0; j < api.data[i].lists.length; j++) {
            await api_list.call('get', {id: api.data[i].lists[j].idCart})
            if (api_list.data.length > 0) {
              api_list.data[0].createBy = api_user.data[0].user
              arr.push(api_list.data[0])
            }
          }
          this.listUser.push({idCart: api.data[i].id, data: api_user.data[0], count: sumCart, lists: arr})
        }
      }
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
          this.listUser = this.listUser.filter(q => q.idCart !== id)
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
      return this.listUser.filter(user => user.data.user.toLowerCase().includes(this.search.toLowerCase()))
    }
  }
}
</script>

<style scoped>

</style>