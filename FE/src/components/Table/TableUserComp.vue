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
            password
          </th>
          <th class="px-6 py-3" scope="col">
            role
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in lists" :key="user.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{{ user.id }}</td>
          <td class="px-6 py-4">{{ user.user }}</td>
          <td class="px-6 py-4">{{ user.pass }}</td>
          <td class="px-6 py-4">{{ user.role }}</td>
          <td class="px-6 py-4 text-right">
            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
                    @click="handleUpdateUser(user.id)">Update
            </button>
            |
            <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
                    @click="handleDeleteUser(user.id)">Delete
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="absolute top-[39px] right-[270px] flex justify-between w-[500px]">
      <div class="flex items-center">
        <input v-model="myRole" type="radio" :value="coverType('all')"/>
        <p>all</p>
      </div>
      <div class="flex items-center" v-for="role in listRoles" :key="role">
        <input v-model="myRole" type="radio" :value="role"/>
        <p>{{ role }}</p>
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

const api = new ApiReponsitory(API_TABLE.ACCOUNT)

export default {
  name: "TableUserComp",
  created() {
    this.loadApi()
  },
  data() {
    return {
      listUser: [],
      listRoles: ['normal', 'fooder', 'admin'],
      myRole: 'all',
      search: ''
    }
  },
  methods: {
    async loadApi() {
      await api.call('get', {})
      this.listUser = api.data
    },
    coverType(name) {
      return coverRoute(name)
    },
    handleUpdateUser(id) {
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), id);
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.ACTION), 'UPDATE_USER');
      showModal(MODAL.user_update)
    },
    handleDeleteUser(id) {
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
          this.$swal({
            title: 'Success it!',
            delay: 1000
          }).then(() => window.location.reload())
        }
      })
    }
  },
  computed: {
    lists() {
      const list = [...this.listUser].filter(acc => acc.user.toLowerCase().includes(this.search.toLowerCase()))
      if (this.myRole === 'all') {
        return list
      }
      return list.filter(acc => acc.role === this.myRole)
    }
  }
}
</script>

<style scoped>

</style>