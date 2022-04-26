<template>
  <div id="app">
    <ModalSearch/>
    <HeaderView/>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.path"/>
    </transition>
  </div>
</template>

<script>

import HeaderView from "@/view/HeaderView";
import ModalSearch from "@/components/Modal/ModalSearch";

export default {
  name: "App",
  components: {HeaderView, ModalSearch},
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
