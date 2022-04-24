<template>
  <div id="app">
    <ModalSearch/>
    <HeaderView/>
    <InformationView/>
  </div>
</template>

<script>

import HeaderView from "@/view/HeaderView";
import InformationView from "@/view/InformationView";

import ModalSearch from "@/components/Modal/ModalSearch";

export default {
  name: "App",
  components: {HeaderView, InformationView, ModalSearch},
};
</script>

<style>

</style>
