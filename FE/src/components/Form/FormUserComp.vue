<template>
  <section class="h-full w-[600px] gradient-form bg-gray-200 md:h-screen">
    <div class="container py-12 px-6 h-full">
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div class="xl:w-10/12">
          <div class="block bg-white shadow-lg rounded-lg">
            <div class="lg:flex ">
              <div class="lg:w-6/12 px-4 md:px-0">
                <div class="md:p-12 md:mx-6">
                  <div class="text-center">
                    <img
                        alt="logo"
                        class="mx-auto w-48"
                        src="https://posapp.vn/wp-content/uploads/2021/11/shopee1.jpg"
                    />
                    <h4 class="text-xl font-semibold mt-1 mb-12 pb-1">{{ lang.title }}</h4>
                  </div>
                  <form>
                    <p class="mb-4">{{ lang.description }}</p>
                    <div class="mb-4">
                      <input
                          v-model.trim="user.name"
                          :placeholder="lang.placeholderUser"
                          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          type="text"
                          autocomplete="on"
                      />
                    </div>
                    <div class="mb-2">
                    </div>
                    <div class="mb-4">
                      <input
                          v-model.trim="user.pass"
                          :placeholder="lang.placeholderPass"
                          class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          type="password"
                          autocomplete="on"
                      />
                      <div v-if="!isFormLogin">
                        <span>Role:</span>
                        <div class="flex justify-center mb-1">
                          <div class="w-[50%] flex justify-between">
                            <div>
                              <input name="role" value="normal" v-model="user.role" type="radio"/>
                              <span>normal</span>
                            </div>
                            <div>
                              <input name="role" value="fooder" v-model="user.role" type="radio"/>
                              <span>fooder</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="text-center pt-1 mb-12 pb-1">
                        <button
                            class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            type="button"
                            @click="isFormLogin ? handleUserLogin() : handleUserRegister()"
                        >
                          {{ lang.btnLogin }}
                        </button>
                        <a class="text-gray-500" href="#!">{{ lang.questions.forgotPassword }}</a>
                      </div>
                      <div class="flex items-center justify-between pb-6">
                        <p class="mb-0 mr-2">{{ lang.questions.dontHaveAccount }}</p>
                        <button
                            class="hover:bg-sky-600 hover:text-white hover:border-amber-50 inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded  focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            type="button"
                            @click="flip"
                        >
                          {{ lang.btnRegister }}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                  class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
              >
                <div class="text-white px-4 py-6 md:p-12 md:mx-6">
                  <h4 class="text-xl font-semibold mb-6">{{ lang.footer.title }}</h4>
                  <p class="text-sm">
                    {{ lang.footer.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";
import {genId, prefix, toast} from "@/util";
import USER from "@/constan/user";

const api = new ApiReponsitory(API_TABLE.ACCOUNT)

export default {
  name: "FormlangComp",
  data() {
    return {
      isFormLogin: true,
    }
  },
  methods: {
    async handleUserRegister() {
      const params = {user: this.user.name, pass: this.user.pass, role: this.user.role};
      await api.call('get', {user: this.user.name})
      if (api.data.length > 0) {
        this.$swal({
          title: this.lang.message.errorHasAccount,
          type: 'error'
        })
      } else {
        params.id = genId("account-")
        params.createAt = Date.now()
        await api.add(params)
        this.$swal({
          title: this.lang.message.successRegister
        })
      }
    },
    async handleUserLogin() {
      const params = {user: this.user.name, pass: this.user.pass}
      await api.call('get', params)
      if (api.data.length === 0) {
        this.$swal({
          title: this.lang.message.error,
          type: 'error'
        })
      } else {
        await this.$store.dispatch(prefix('userStore', USER.MODEL.SET), api.data[0])
        this.$router.go(-1);
        toast(this.$i18n.t('user.message.success', {username: this.user.name}))
      }
    },
    flip() {
      this.isFormLogin = !this.isFormLogin;
    }
  },
  computed: {
    user() {
      return {
        name: '',
        pass: '',
        role: ''
      }
    },
    lang() {
      return {
        title: this.$i18n.t('user.title'),
        description: this.$i18n.t('user.description'),
        placeholderUser: this.$i18n.t('user.placeholderUser'),
        placeholderPass: this.$i18n.t('user.placeholderPass'),
        btnLogin: this.isFormLogin ? this.$i18n.t('user.btnLogin') : this.$i18n.t('user.btnRegister'),
        btnRegister: this.isFormLogin ? this.$i18n.t('user.btnRegister') : this.$i18n.t('user.btnLogin'),
        questions: {
          forgotPassword: this.$i18n.t('user.questions.forgotPassword'),
          dontHaveAccount: this.$i18n.t('user.questions.dontHaveAccount')
        },
        footer: {
          title: this.$i18n.t('user.footer.title'),
          description: this.$i18n.t('user.footer.description')
        },
        message: {
          error: this.$i18n.t('user.message.error'),
          success: this.$i18n.t('user.message.success', {username: this.user.name}),
          errorHasAccount: this.$i18n.t('user.message.errorHasAccount'),
          successRegister: this.$i18n.t('user.message.successRegister'),

        }
      }
    }
  }
}
</script>

<style scoped>

</style>