<template>
  <section>
    <div
        class="h-full fixed top-[70px] w-full overflow-auto z-0 flex justify-center  container__cart"
    >
      <FormCartComp/>
    </div>
  </section>
</template>

<script>
import FormCartComp from "@/components/Form/FormCartComp";

export default {
  name: "FormCartView",
  components: {FormCartComp}
}
</script>

<style scoped>

</style>