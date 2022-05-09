<template>
  <section class="h-full w-[600px] gradient-form bg-gray-200 md:h-screen">

    <div class="mb-4">
      <span>User Name: </span>
      <input
          v-model.trim="user.user"
          autocomplete="on"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="text"
      />
    </div>
    <div class="mb-2">
    </div>
    <div class="mb-4">
      <span>Pass word: </span>
      <input
          v-model.trim="user.pass"
          autocomplete="on"
          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="text"
      />

      <span>Role:</span>
      <div class="flex justify-center mb-1">
        <div class="w-[50%] flex justify-between">
          <div>
            <input v-model="user.role" name="role" type="radio" value="normal"/>
            <span>normal</span>
          </div>
          <div>
            <input v-model="user.role" name="role" type="radio" value="fooder"/>
            <span>fooder</span>
          </div>
          <div>
            <input v-model="user.role" name="role" type="radio" value="admin"/>
            <span>admin</span>
          </div>
        </div>
      </div>
      <div class="px-6 pt-4 pb-2">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                @click="handleUpdateUser">
          update
        </button>
      </div>
    </div>

  </section>
</template>

<script>
import {prefix, turnOffModal} from "@/util";
import INFORMATION from "@/constan/information";
import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";
import MODAL from "@/constan/modal";

const api = new ApiReponsitory(API_TABLE.ACCOUNT)

export default {
  name: "FormUserUpdateComp",

  data() {
    return {
      user: {}
    }
  },
  methods: {
    async loadApi() {
      if (this.action === 'UPDATE_USER' && this.id !== '') {
        const params = {id: this.id};
        await api._call('get', params);
        this.user = api.data[0];
      }
    },
    async handleUpdateUser() {
      await api.update(this.user);
      await this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), '');
      await this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.ACTION), '');
      turnOffModal(MODAL.user_update);
      this.$swal({
        title: 'Update user success!',
        delay: 1000,
      }).then(() => window.location.reload())
    }
  },
  computed: {
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
    },
  },
  watch: {
    id: {
      immediate: true,
      deep: true,
      handler: 'loadApi'
    }
  }
}
</script>

<style scoped>

</style>