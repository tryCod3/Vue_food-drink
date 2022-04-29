<template>
  <section :id="idClass"
           class="hidden flex justify-center  absolute top-0 left-0 right-0 left-0 bg-black opacity-[0.9] z-[101] h-full container__cartUpdate">
    <div class="w-[900px] text-white flex flex-col justify-center ">
      <button @click="turnOnModalUpdate" class="text-white text-right">X</button>
      <FormCartComp
          :is-update=true
      />
    </div>
  </section>
</template>

<script>
import MODAL from "@/constan/modal";
import {prefix, turnOffModal} from "@/util";
import FormCartComp from "@/components/Form/FormCartComp";
import INFORMATION from "@/constan/information";


export default {
  name: "ModalCartUpdate",
  components: {FormCartComp},
  data() {
    return {
      idClass: MODAL.cart_update,
    }
  },
  methods: {
    turnOnModalUpdate() {
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), '')
      turnOffModal(this.idClass);
    }
  },
}
</script>

<style scoped>

</style>