<template>
  <section>
    <div
        class="h-screen overflow-auto fixed top-[70px] w-full  z-0 flex  justify-center container__showlist"
    >
      <PageShowListComp/>
    </div>
  </section>
</template>

<script>
import PageShowListComp from "@/components/Page/PageShowListComp";

export default {
  name: "PageShowListView",
  components: {
    PageShowListComp
  }
}
</script>

<style scoped>

</style>