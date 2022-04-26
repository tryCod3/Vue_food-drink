<template>
  <ShowListSlot>
    <div v-for="i in 27" :key="i" slot="show-list">
      <CartComp
          name="Quán Nhậu Bình Dân A Béo"
          description="14 An Nhơn , Đường phú nhuận , thành phố Tuy Phước"
          :btn="btnDetail"
      >
      </CartComp>
    </div>
    
  </ShowListSlot>
</template>

<script>

import ShowListSlot from "@/slot/ShowListSlot";
import CartComp from "@/components/Cart/CartComp";

export default {
  name: "PageShowListComp",
  components: {
    ShowListSlot,
    CartComp
  },
  computed: {
    btnDetail() {
      return this.$i18n.t('information.btnDetail');
    }
  }
}
</script>

<style scoped>

</style>