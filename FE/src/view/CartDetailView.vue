<template>
  <section>
    <div
        class="overflow-auto w-screen h-full fixed flex justify-center top-[70px] w-full  z-0   container__cartdetail"
    >
      <CartDetailComp
      />
    </div>
  </section>
</template>

<script>

import CartDetailComp from "@/components/Cart/CartDetailComp";

export default {
  name: "CartDetailView",
  components: {CartDetailComp}

}
</script>

<style scoped>

</style>