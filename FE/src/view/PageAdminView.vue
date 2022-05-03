<template>
  <section>
    <div
        class="h-screen fixed top-[70px] w-full overflow-hidden z-0 flex justify-center bg-cover container__admin"
    >
      <PageAdminComp/>
    </div>
  </section>
</template>

<script>
import PageAdminComp from "@/components/Page/PageAdminComp";

export default {
  name: "PageAdminView",
  components: {PageAdminComp}
}
</script>

<style scoped>

</style>