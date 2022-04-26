<template>
  <div class="w-full h-3/4 p-9 flex ">
    <div class="flex flex-col flex-wrap information__search__namefood">
      <h1 class="text-amber-50 mb-3">Topic: </h1>
      <div
          v-for="t in topic"
          :key="t"
          class="flex items-center mr-4 mb-4"
          style="height: 33px"
      >
        <a
            class="text-amber-50 px-4 py-1.5 text-base border rounded hover:text-black hover:bg-white hover:cursor-pointer"
        >
          {{ t }}
        </a>
      </div>
    </div>

    <div class="flex flex-col flex-wrap information__search__namefood">
      <h1 class="text-amber-50 mb-3">Level: </h1>
      <div
          v-for="l in level"
          :key="l"
          class="flex items-center mr-4 mb-4"
          style="height: 33px"
      >
        <a
            class="text-amber-50 px-4 py-1.5 text-base border rounded hover:text-black hover:bg-white hover:cursor-pointer"
        >
          {{ l }}
        </a>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: "CartDetailInformation",
  computed: {
    topic() {
      return this.$i18n.t('cart.topic')
    },
    level() {
      return this.$i18n.t('cart.level')
    },
  }
}
</script>

<style scoped>

</style>