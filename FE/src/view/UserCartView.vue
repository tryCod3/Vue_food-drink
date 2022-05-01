<template>
  <section>
    <div
        class="h-full fixed top-[70px] w-full overflow-auto z-0 flex justify-center container__usercart"
    >
      <CartUserComp/>
    </div>
  </section>
</template>

<script>
import CartUserComp from "@/components/User/UserCartComp";

export default {
  name: "UserCartView",
  components: {CartUserComp}
}
</script>

<style scoped>

</style>