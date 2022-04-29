<template>
  <section>
    <div
        class="relative  top-[40px] flex justify-center  container__user"
    >
      <FormUserComp/>
    </div>
  </section>
</template>

<script>
import FormUserComp from "@/components/Form/FormUserComp";

export default {
  name: "FormUserView",
  components: {FormUserComp}
}
</script>

<style scoped>

</style>