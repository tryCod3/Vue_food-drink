<template>
    <section :class=style class="container__header">
      <HeaderComp />
    </section>
</template>

<script>

import HeaderComp from "@/components/Header/HeaderComp";

export default {
  name: "HeaderView.vue",
  components: {
    HeaderComp,
  },
  data() {
    return {
      style: {
        "w-full": true,
        "flex": true,
        "justify-center": true,
        'bg-white': true,
      }
    }
  }
}
</script>

<style scoped>

.container__header {
  height: 70px;
  position: fixed;
}

</style>