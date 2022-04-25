<template>
  <section class="container__showlist">
    <div class="showlist">
      <h1>List deal</h1>
      <div>
        <button>Area</button>
        <div>
          <h3>300 resurt</h3>
          <button>All</button>
        </div>
        <div>
          <slot name="show-list"></slot>
        </div>
        <div>
          phân trang ....
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ShowListSlot"
}
</script>

<style scoped>

</style>