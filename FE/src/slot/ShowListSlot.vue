<template>
  <section class="w-full h-full  flex  text-white showlist">
    <div class=" text-black">
      <h1 class="text-center text-3xl">List deal [ALL]</h1>
      <div class="flex justify-between my-4">
        <button>Area</button>
        <select v-model="option" @change="changeOption">
          <option value="">-option-</option>
          <option value="price-desc">price desc</option>
          <option value="price-asc">price asc</option>
          <option value="name-az">name alpha a-z</option>
        </select>
      </div>
      <hr class="my-4"/>
      <div class="grid grid-cols-5 gap-4 p-2 mb-32">
        <slot name="show-list"></slot>
      </div>
      <div class="">
        <!-- Previous Button -->
        <a class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
           href="#">
          Previous
        </a>
        <!-- Next Button -->
        <a class="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
           href="#">
          Next
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ShowListSlot",
  data() {
    return {
      option: ''
    }
  },
  methods: {
    changeOption() {
      console.log(this.option)
      switch (this.option) {
        case 'price-asc':
          this.$router.push({name: 'location-item-watch', query: {_sort: 'price', _order: 'asc'}});
          break;
        case 'price-desc':
          this.$router.push({name: 'location-item-watch', query: {_sort: 'price', _order: 'desc'}});
          break;
        case 'name-az':
          this.$router.push({name: 'location-item-watch', query: {_sort: 'name', _order: 'asc'}});
          break;
        default:
          this.$router.push({name: 'location-item-watch'}).catch(() => {
          });
          break;
      }
    }
  },
}
</script>

<style scoped>
.showlist {
  width: 1200px;
}
</style>