<template>
  <div class="overflow-auto grid grid-cols-1 gap-2 p-2">
    <CartComp v-for="food in dataSugget"
              :id="food.id"
              :key="food.id"
              :btn="btnDetail"
              :description="food.description"
              :image="food.image"
              :name="food.name"
              :price="food.price"
              :role="role"
    />
  </div>
</template>

<script>

import CartComp from "@/components/Cart/CartComp";
import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";
import {getAccount} from "@/util";

const api = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "CartDetailSupgget",
  components: {CartComp},
  beforeUpdate() {
    this.role = getAccount() ? JSON.parse(getAccount()).role : ''
  },
  props: {
    location: String,
    item: String
  },
  data() {
    return {
      dataSugget: [],
      role: getAccount() ? JSON.parse(getAccount()).role : ''
    }
  },
  created() {
    this.getApi();
  },
  methods: {
    async getApi() {
      await api._call('get', {signLocation: this.location})
      await api._filter((food) => food.tags.includes(this.item))
      this.dataSugget = api.data
    }
  },
  computed: {
    btnDetail() {
      return this.$i18n.t('information.btnDetail');
    }
  }
}
</script>

<style scoped>

</style>