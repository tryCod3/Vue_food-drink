<template>
  <div
      class="z-0 flex flex-col basis-[50%] justify-center information__search"
  >
    <div class="information__search__title">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
    <div class="my-5 information__search__search">
      <div class="mb-3 xl:w-96">
        <div
            class="input-group relative flex flex-wrap items-stretch w-full mb-4"
        >
          <input
              type="search"
              class="form-control relative flex-auto min-w-0 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              :placeholder="search"
              aria-label="Search"
              aria-describedby="button-addon2"
          />
          <button
              class="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="button"
              id="button-addon2"
          >
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                class="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
              <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap information__search__namefood">
      <div
          v-for="tag in tagFoods"
          :key="tag"
          class="flex items-center mr-4 mb-4"
          style="height: 33px"
      >
        <a
            class="px-4 py-1.5 text-base border rounded hover:text-black hover:bg-white hover:cursor-pointer"
        >
          {{ tag }}
        </a>
      </div>
    </div>
    <div class="information__search__linkapp">
      <div class="mt-4 mb-3 text-xl">
        {{ titleLink1 }}
        <br/>
        {{ titleLink2 }}
      </div>
      <div class="flex">
        <img
            src="@/assets/image/appstore.png"
            alt="icon app store"
            style="width: 164.25px; height: 51px"
            class="hover:cursor-pointer"
        />
        <img
            src="@/assets/image/google.png"
            alt="icon google play"
            class="ml-4 hover:cursor-pointer"
            style="width: 164.25px; height: 51px"
        />
      </div>
    </div>
  </div>
</template>

<script>

import INFORMATION from "@/constan/information";
import {prefix} from "@/util";

const nameStore = 'informationStore'

export default {
  name: "InformationTagElem",

  data() {
    return {};
  },
  computed: {
    location: {
      set() {
      },
      get() {
        return this.$store.getters[prefix(nameStore, INFORMATION.LOCATION.GET)];
      }
    },
    title() {
      return this.$i18n.t('information.title')
    },
    description() {
      return this.$i18n.t('information.description', {location: this.location.name})
    },
    search() {
      return this.$i18n.t('information.search')
    },
    titleLink1() {
      return this.$i18n.t('information.titleLink1')
    },
    titleLink2() {
      return this.$i18n.t('information.titleLink2')
    },
    tagFoods() {
      return this.$i18n.t('information.tags')
    }
  }
};
</script>

<style></style>
