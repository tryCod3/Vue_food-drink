<template>
  <section :id="idClass"
           class=" absolute top-0 left-0 right-0 left-0 bg-black opacity-[0.8] z-[101] h-full container__modalsearch">
    <div class="flex flex-col mt-6 w-[760px] mx-auto">
      <h2 class="text-amber-50 text-right font-semibold">
        <span class="hover:cursor-pointer" @click="turnOnModalSearch">
          X
        </span>
      </h2>
      <div class="">
        <img alt="bg search" class="w-full" src="@/assets/image/bgsearch.png"/>
      </div>
      <div class="text-amber-50 flex flex-col items-center ">
        <h3 class="mt-2">Đặt Đồ ăn, giao hàng từ 20'... có 3092 địa điểm ở Cần Thơ từ 06:00 - 22:00</h3>
        <input class="text-center mt-4 w-full h-10 bg-transparent border border-t-0 border-r-0 border-l-0"/>
      </div>
    </div>
  </section>
</template>

<script>
import MODAL from "@/constan/modal";
import {turnOffModal} from '@/util'

export default {
  name: "ModalSearch",
  data() {
    return {
      idClass: MODAL.search
    }
  },
  methods: {
    turnOnModalSearch() {
      turnOffModal(this.idClass);
    },
  }

}
</script>

<style scoped>

.container__modalsearch{
  display: none;
}

</style>