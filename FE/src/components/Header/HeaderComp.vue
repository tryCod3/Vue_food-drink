<template>
  <nav :class="style.header" class="header">
    <div class="flex justify-between">
      <div class="self-center display header__img">
        <img
            alt="icon shope"
            class="laptop:pr-20"
            src="@/assets/image/shopeefoodvn.png"
            @click="()=>{
              this.$router.push({name: 'home'})
            }"
        />
      </div>
      <div class="relative flex flex-col self-center header__location">
        <button
            id="dropdownDefault"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            data-dropdown-toggle="dropdown"
            type="button"
            @click="showToggleLocation = !showToggleLocation"
        >
          {{ paramLocation }}
          <svg
              class="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M19 9l-7 7-7-7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            ></path>
          </svg>
        </button>
        <div
            v-show=showToggleLocation
            id="dropdown"
            class="absolute top-[40px] z-10 w-52 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
              aria-labelledby="dropdownDefault"
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
          >
            <li
                v-for="where in toggleLocations"
                :key="where.name"
                class=" flex p-2 justify-between hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="showToggleLocation = !showToggleLocation"
            >
              <router-link :to="path(convertType(where.name) , paramTagItem)">
                <span>
                  {{ where.name }}
                </span>
                <p>{{ where.count }} địa điểm</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="flex flex-row flex-1">
      <div
          :class="style.header__typefood"
          class="self-center flex-1 tablet:pl-12 header__typefood"
      >
        <li
            v-for="type in typesFood"
            :key="type"
            class="links list-none h-full float-left pt-2.5 px-3 pb-4 hover:border hover:border-t-0 hover:border-l-0 hover:border-r-0 hover:border-[#ee4d2d] hover:text-[#ee4d2d] hover:cursor-pointer"
        >
          <router-link :to="path(paramLocation , convertType(type))">
            <span class="self-center">
                {{ type }}
            </span>
          </router-link>

        </li>
      </div>
      <div class="self-center p-5 header__search">
        <img
            alt="icon search"
            class="hover:cursor-pointer"
            src="@/assets/image/iconfind24.png"
            @click="showModalSearch"
        />
      </div>
      <div
          class="self-center border border-[#ee4d2d] text-[#ee4d2d] rounded header__login"
      >
        <button class="btn" @click="['fooder', 'admin' , 'normal'].includes(role) ? handleLogout() : handleLogin()">
          {{ btnLogin }}
        </button>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="absolute right-[150px] top-2">
        <img alt="user icon" src="@/assets/image/user.png"
             @click="() => { if(['admin' , 'fooder'].includes(role)) this.showSetting = !this.showSetting}"/>
        <div :class="role === 'admin' ? 'text-red-600' : 'text-teal-600'" class="text-center w-full">
          {{ name }}
        </div>
        <template v-if="['admin' , 'fooder'].includes(role) && showSetting">
          <div class="absolute">
            <div class="absolute top-[10px] left-[9px] bg-amber-200 rounded  text-black">
              <ul>
                <li @click="handleRole(role)" class="px-5 hover:bg-amber-400 hover:cursor-pointer">{{
                    role === 'admin' ? 'setting' : 'addCart'
                  }}
                </li>
                <li v-if="role !== '' && role !== 'admin'" @click="handleRole('userCart')"
                    class="px-5 hover:bg-amber-400 hover:cursor-pointer">
                  userCard
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>
      <select v-model="langApp" class="laptop:absolute top-5 right-2 hover:cursor-pointer">
        <option value="vn">Tiếng Việt</option>
        <option value="en">Tiếng Anh</option>
      </select>
    </div>
  </nav>
</template>

<script>

import MODAL from "@/constan/modal";
import {coverRoute, prefix, showModal} from "@/util";
import INFORMATION from "@/constan/information";
import USER from "@/constan/user";
import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";

const nameStore = 'informationStore'

const api = new ApiReponsitory(API_TABLE.LOCATION)
const api_list = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "HeaderComp",
  beforeUpdate() {
    this.name = localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model'))?.user ?? '' : ''
    this.role = localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model'))?.role ?? 'normal' : ''
    this.id = localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model'))?.id ?? '' : ''
  },
  created() {
    this.loadApi()
  },
  data: function () {
    return {
      showToggleLocation: false,
      showSetting: false,
      modalSearch: MODAL.search,
      name: localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model'))?.user ?? '' : '',
      role: localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model'))?.role ?? 'normal' : '',
      id: localStorage.getItem('model') ? JSON.parse(localStorage.getItem('model'))?.id ?? '' : '',
      toggleLocations: [],
      style: {
        header: {
          "laptop:flex": true,
          "laptop:flex-row": true,
        },
        header__typefood: {
          "float-left": true,
        },
        header__location__link: {
          flex: true,
          "flex-row": true,
        },
      },
    };
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
    typesFood() {
      return this.$i18n.t('header.listsFood')
    },
    btnLogin() {
      return this.role === '' ? this.$i18n.t('header.login') : this.$i18n.t('header.logout')
    },
    langApp: {
      set(e) {
        this.$store.dispatch(prefix(nameStore, INFORMATION.LANG.SET), e);
      },
      get() {
        return this.$store.getters[prefix(nameStore, INFORMATION.LANG.GET)];
      }
    },
    wellCome: {
      set() {
      },
      get() {
        return this.$store.getters[prefix('userStore', USER.MESSAGE.GET)]
      }
    },
  },
  methods: {
    async loadApi() {
      await api.call('get', {})
      const listLocation = api.data
      for (let i = 0; i < listLocation.length; i++) {
        await api_list.call('get', {signLocation: coverRoute(listLocation[i].sign)})
        if (api_list.data.length > 0)
          this.toggleLocations.push({name: listLocation[i].sign, count: api_list.data.length})
      }
    },
    path(location, item) {
      let nameRoute = this.$route.name
      if (nameRoute !== 'location-item-watch')
        nameRoute = 'location-item'
      return {
        name: nameRoute,
        params: {
          location: location,
          tagItem: item,
        },
        query: this.$route.query
      }
    },
    showModalSearch() {
      showModal(MODAL.search)
    },
    convertType(type) {
      return coverRoute(type);
    },
    handleLogin() {
      this.$router.push({name: 'user-login'});
    },
    handleLogout() {
      localStorage.setItem('model', '')
      this.name = ''
      this.role = ''
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), '')
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.ACTION), '')
      if (this.$route.name !== 'home')
        this.$router.push({name: 'home'});
      this.$toasted.show(this.$i18n.t('user.message.logout'), {
        delay: 1000,
        duration: 3000,
        icon: 'check',
        position: 'top-right',
        theme: 'bubble',
      })
    },
    handleRole(action) {
      this.showSetting = !this.showSetting
      if (action === 'userCart') {
        this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), this.id)
        this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.ACTION), 'USER_CART')
        this.$router.push({name: 'user-cart'})
      } else if (action === 'fooder') {
        this.$router.push({name: 'cart-add'})
      } else {
        this.$router.push({name: 'admin'})
      }
    },
  },
}
</script>

<style scoped>
.header {
  width: 1200px;
}

#nav a.my-color-link {
  color: #ab26ab;
}
</style>
