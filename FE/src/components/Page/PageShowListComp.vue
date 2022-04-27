<template>
  <ShowListSlot>
    <div v-for="food in listData" :key="food.id" slot="show-list">
      <CartComp
          :id="food.id"
          :btn="btnDetail"
          :description=food.description
          :image=food.image
          :name=food.name
      >
      </CartComp>
    </div>
  </ShowListSlot>
</template>

<script>

import ShowListSlot from "@/slot/ShowListSlot";
import CartComp from "@/components/Cart/CartComp";
import {API_TABLE} from "@/constan/api";
import {ApiReponsitory} from "@/api/ApiReponsitory";

const api = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "PageShowListComp",
  components: {
    ShowListSlot,
    CartComp
  },
  data() {
    return {
      listData: []
    }
  },
  methods: {
    async getAllList() {
      console.log("getAllList")
      const params = {
        signLocation: this.paramLocation,
        ...this.$route.query
      }
      await api.call('get', params);
      await api._filter(food => food.tags.includes(this.paramTagItem))
      this.listData = api.data;
    }
  },
  computed: {
    btnDetail() {
      return this.$i18n.t('information.btnDetail');
    },
    paramLocation: {
      set() {
      },
      get() {
        return this.$route.params?.location ?? 'da-nang'
      }
    },
    paramTagItem: {
      set() {
      },
      get() {
        return this.$route.params?.tagItem ?? 'do-an'
      }
    },
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler: 'getAllList'
    }
  }
}
</script>

<style scoped>

</style>