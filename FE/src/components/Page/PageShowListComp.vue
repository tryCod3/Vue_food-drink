<template>
  <ShowListSlot>
    <div slot="show-list">
      <CartFoodSlot
      >

      </CartFoodSlot>
    </div>
  </ShowListSlot>
</template>

<script>

import ShowListSlot from "@/slot/ShowListSlot";
import CartFoodSlot from "@/slot/CartFoodSlot";

export default {
  name: "PageShowListComp",
  components: {
    ShowListSlot,
    CartFoodSlot
  }
}
</script>

<style scoped>

</style>