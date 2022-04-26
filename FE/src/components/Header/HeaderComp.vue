<template>
  <nav :class="style.header" class="header">
    <div class="flex justify-between">
      <div class="self-center display header__img">
        <img
            alt="icon shope"
            class="laptop:pr-20"
            src="@/assets/image/shopeefoodvn.png"
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
          {{ location.name }}
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
                :key="where.shortName"

                class=" flex p-2 justify-between hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="changeLocation(where)"
            >
              <router-link :to="{name:'locationsItem' ,
                          params:{location: convertType(where.name), tagItem: convertType(item)} }">
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
            class="list-none h-full float-left pt-2.5 px-3 pb-4 hover:border hover:border-t-0 hover:border-l-0 hover:border-r-0 hover:border-[#ee4d2d] hover:text-[#ee4d2d] hover:cursor-pointer"
            @click="changeItem(type)">
          <router-link :to="{name:'locationsItem' ,
                          params:{location: convertType(location.name), tagItem: convertType(type)} }">
            <span class="self-center">
                {{ type }}
            </span>
          </router-link>
        </li>
      </div>
      <div class="self-center p-5 header__search">
        <img
            :modal="modalSearch"
            alt="icon search"
            class="hover:cursor-pointer"
            src="@/assets/image/iconfind24.png"
            @click="showModalSearch"
        />
      </div>
      <div
          class="self-center border border-[#ee4d2d] text-[#ee4d2d] rounded header__login"
      >
        <button class="btn"> {{ btnLogin }}</button>
      </div>
    </div>
    <div class="flex justify-center">
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

const nameStore = 'informationStore'

export default {
  name: "HeaderComp",

  data: function () {
    return {
      showToggleLocation: false,
      modalSearch: MODAL.search,
      toggleLocations: [
        {
          name: "Đà Nẵng",
          count: 12345,
        },
        {
          name: "Hồ Chí Minh",
          count: 16153,
        },
        {
          name: "Hà Nội",
          count: 2731,
        },
      ],
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
        return this.$route.params?.location
      }
    },
    paramTagItem: {
      set() {
      },
      get() {
        return this.$route.params?.tagItem
      }
    },
    typesFood() {
      return this.$i18n.t('header.listsFood')
    },
    btnLogin() {
      return this.$i18n.t('header.login')
    },
    langApp: {
      set(e) {
        this.$store.dispatch(prefix(nameStore, INFORMATION.LANG.SET), e);
      },
      get() {
        return this.$store.getters[prefix(nameStore, INFORMATION.LANG.GET)];
      }
    },
    location: {
      set() {
      },
      get() {
        return this.$store.getters[prefix(nameStore, INFORMATION.LOCATION.GET)];
      }
    },
    item: {
      set() {
      },
      get() {
        return this.$store.getters[prefix(nameStore, INFORMATION.ITEM.GET)];
      }
    }
  },
  methods: {
    showModalSearch(e) {
      showModal(e.target)
    },
    changeLocation(where) {
      this.showToggleLocation = !this.showToggleLocation;
      where.name = coverRoute(where.name);
      this.$store.dispatch(prefix(nameStore, INFORMATION.LOCATION.SET), where)
    },
    changeItem(item) {
      this.$store.dispatch(prefix(nameStore, INFORMATION.ITEM.SET), item)
    },
    convertType(type) {
      return coverRoute(type);
    }
  },
  watch: {
    immediate: true,
    deep: true,
    '$route'(to) {
      this.paramLocation = to.params?.location ?? this.paramLocation
      this.paramTagItem = to.params?.tagItem ?? this.paramTagItem
      if (this.paramLocation && this.paramTagItem) {
        this.location.name = coverRoute(this.paramLocation);
        this.$store.dispatch(prefix(nameStore, INFORMATION.LOCATION.SET), this.location);
        this.$store.dispatch(prefix(nameStore, INFORMATION.ITEM.SET), this.paramTagItem);
      }
    },
  }
}
</script>

<style scoped>
.header {
  width: 1200px;
}
</style>
