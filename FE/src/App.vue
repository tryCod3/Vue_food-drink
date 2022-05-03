<template>
  <div id="app">
    <ModalSearch/>
    <ModalCartUpdate/>
    <ModalUserUpdate/>
    <HeaderView/>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>

import HeaderView from "@/view/HeaderView";
import ModalSearch from "@/components/Modal/ModalSearch";
import ModalCartUpdate from "@/components/Modal/ModalCartUpdate";
import ModalUserUpdate from "@/components/Modal/ModalUserUpdate";

export default {
  name: "App",
  components: {ModalUserUpdate, ModalCartUpdate, HeaderView, ModalSearch},
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}


</style>
