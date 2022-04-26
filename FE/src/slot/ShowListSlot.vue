<template>
  <section class="w-full h-full  flex  text-white showlist">
    <div class=" text-black">
      <h1 class="text-center text-3xl">List deal [ALL]</h1>
      <div class="flex justify-between my-4">
        <button>Area</button>
        <div class="flex">
          <h3>300 resurt</h3>
        </div>
      </div>
      <hr class="my-4"/>
      <div class="grid grid-cols-5 gap-4 p-2 mb-32">
        <slot name="show-list"></slot>
      </div>
      <div class="">
        <!-- Previous Button -->
        <a href="#"
           class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Previous
        </a>

        <!-- Next Button -->
        <a href="#"
           class="inline-flex items-center py-2 px-4 ml-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ShowListSlot"
}
</script>

<style scoped>
.showlist {
  width: 1200px;
}
</style>