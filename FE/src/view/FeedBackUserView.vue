<template>
  <section>
    <div
        class="h-screen fixed top-[70px] w-full overflow-hidden z-0 flex justify-center bg-cover container__feedBackUser"
    >
      <FormFeedBack/>
    </div>
  </section>
</template>

<script>
import FormFeedBack from "@/components/Form/FormFeedBack";

export default {
  name: "FeedBackUserView",
  components: {FormFeedBack}
}
</script>

<style scoped>

</style>