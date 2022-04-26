<template>
  <div id="app">
    <ModalSearch/>
    <HeaderView/>
    <router-view/>
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

</style>
