<template>
  <div class="w-1/2 overflow-auto grid grid-cols-1 gap-2 p-2">
    <CartComp v-for="i in 5" :key="i"
              :btn=btnDetail
              description="333 hoành sơn đông , Đà nẵng"
              name="Quán nướng A béo"/>
  </div>
</template>

<script>

import CartComp from "@/components/Cart/CartComp";

export default {
  name: "CartDetailSupgget",
  components: {CartComp},
  computed: {
    btnDetail() {
      return this.$i18n.t('information.btnDetail');
    }
  }
}
</script>

<style scoped>

</style>