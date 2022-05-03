<template>
  <section :id="idClass"
           class="hidden flex justify-center  absolute top-0 left-0 right-0 left-0 bg-black opacity-[0.9] z-[101] h-full container__cartUpdate">
    <div class="w-[600px] text-black flex flex-col justify-center m-auto ">
      <button @click="turnOnModalUpdate" class="text-white text-right">X</button>
      <FormUserUpdateComp/>
    </div>
  </section>
</template>

<script>
import MODAL from "@/constan/modal";
import {prefix, turnOffModal} from "@/util";
import INFORMATION from "@/constan/information";
import FormUserUpdateComp from "@/components/Form/FormUserUpdateComp";

export default {
  name: "ModalUserUpdate",
  components: {FormUserUpdateComp},
  data() {
    return {
      idClass: MODAL.user_update,
    }
  },
  methods: {
    turnOnModalUpdate() {
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.SET), '')
      this.$store.dispatch(prefix('informationStore', INFORMATION.ID_MODEL.ACTION), '')
      turnOffModal(this.idClass);
    }
  },
}
</script>

<style scoped>

</style>