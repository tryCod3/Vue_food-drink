<template>
  <div class="mt-2.5  cartDetail">
    <div
        class=" h-3/4 overflow-hidden flex justify-between bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CartDetailImage description="12 ngũ hành sơn , đà nẵng" name="Quán Nướng A béo" price=121.8
      />
      <CartDetailInformation/>
      <CartDetailSupgget/>
    </div>
  </div>
</template>

<script>
import CartDetailImage from "@/components/Cart/CartDetailImage";
import CartDetailInformation from "@/components/Cart/CartDetailInformation";
import CartDetailSupgget from "@/components/Cart/CartDetailSupgget";

export default {
  name: "CartDetailComp",
  components: {CartDetailSupgget, CartDetailInformation, CartDetailImage},
  data() {
    return {}
  }
}
</script>

<style scoped>
.cartDetail {
  width: 1200px;
}

</style>