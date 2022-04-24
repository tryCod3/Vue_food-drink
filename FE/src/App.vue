<template>
  <div id="app">
    <HeaderView/>
    <InformationView/>
  </div>
</template>

<script>

import HeaderView from "@/view/HeaderView";
import InformationView from "@/view/InformationView";

export default {
  name: "App",
  components: {HeaderView,InformationView},
};
</script>

<style>

</style>
