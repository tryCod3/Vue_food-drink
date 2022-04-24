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
            data-dropdown-toggle="dropdown"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            @click="showToggleLocation = !showToggleLocation"
        >
          Đà Nẵng
          <svg
              class="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <div
            id="dropdown"
            class="absolute top-[40px] z-10 w-52 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            v-show=showToggleLocation
        >
          <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
          >
            <li
                v-for="where in toggleLocations"
                :key="where.location"
                class=" flex p-2 justify-between hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="showToggleLocation = !showToggleLocation"
            >
              <a href="#">{{ where.location }}</a>
              <p>{{ where.count }}</p>
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
        <div
            v-for="type in typesFood"
            :key="type"
            class="h-full float-left pt-2.5 px-3 pb-4 hover:border hover:border-t-0 hover:border-l-0 hover:border-r-0 hover:border-[#ee4d2d] hover:text-[#ee4d2d] hover:cursor-pointer"
        >
          <span class="self-center">{{ type }}</span>
        </div>
      </div>
      <div class="self-center p-5 header__search">
        <img
            alt="icon search"
            src="@/assets/image/iconfind24.png"
            class="hover:cursor-pointer"
            :modal="modalSearch"
            @click="showmodalSearch"
        />
      </div>
      <div
          class="self-center border border-[#ee4d2d] text-[#ee4d2d] rounded header__login"
      >
        <button class="btn">Đăng Nhập</button>
      </div>
    </div>
    <div class="flex justify-center">
      <select class="laptop:absolute top-5 right-2 hover:cursor-pointer">
        <option value="vn">Tiếng Việt</option>
        <option value="en">Tiếng Anh</option>
      </select>
    </div>
  </nav>
</template>

<script>

import MODAL from "@/constan/modal";
import {showModal} from "@/util";


export default {
  name: "HeaderComp",
  data() {
    return {
      showToggleLocation: false,
      modalSearch: MODAL.search,
      toggleLocations: [
        {
          location: "Đà Nẵng",
          count: "12345 địa điểm",
        },
        {
          location: "Hồ Chí Minh",
          count: "16153 địa điểm",
        },
        {
          location: "Hà Nội",
          count: "2731 địa điểm",
        },
      ],
      typesFood: [
        "Đồ ăn",
        "Thực phẩm",
        "Bia",
        "Hoa",
        "Siêu thị",
        "Thuốc",
        "Thú cưng",
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
  methods: {
    showmodalSearch(e) {
      showModal(e.target)
    }
  }
};
</script>

<style scoped>
.header {
  width: 1200px;
}
</style>
