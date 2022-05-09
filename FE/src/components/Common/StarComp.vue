<template>
  <div :class="_direction">
    <button v-for="i in 5" :key="i" :style="{marginRight: '3px' , width: `${wid}px`  }" @click="handleStar(i)">
      <svg :class="[ ratting >= i ? 'text-amber-400': 'text-gray-500' , sz]"
           fill="currentColor"
           viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "StarComp",
  props: {
    ratting: {
      type: Number,
      default: 0
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    szStar: {
      type: String,
      default: "8"
    },
    direction: {
      type: String,
      default: 'center'
    },
    wid: {
      type: String,
      default: '16'
    }
  },
  methods: {
    handleStar(star) {
      if (this.isEdit) {
        this.$emit("star", star)
      }
    },
  },
  computed: {
    sz() {
      return `block h-${this.szStar} w-${this.szStar}`
    },
    _direction() {
      return `flex justify-${this.direction}`
    },

  }
}
</script>

<style scoped>

</style>