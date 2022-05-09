<template>
  <ShowListSlot>
    <div v-for="food in listData" :key="food.id" slot="show-list" class="h-full">
      <CartComp
          :id="food.id"
          :btn="btnDetail"
          :description=food.description
          :image=food.image
          :name=food.name
          :createBy="food.createBy"
          :role="role"
          @deleteCart="deleteCart"
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
import {getAccount} from "@/util";
import {getRouteParams} from "@/util/app";

const api = new ApiReponsitory(API_TABLE.LIST)

export default {
  name: "PageShowListComp",
  components: {
    ShowListSlot,
    CartComp
  },
  data() {
    return {
      listData: [],
      role: getAccount() ? JSON.parse(getAccount()).role : ''
    }
  },
  methods: {
    async getAllList() {
      const params = {
        signLocation: this.paramLocation,
        ...this.$route.query
      }
      await api._call('get', params);
      await api._filter(food => food.tags.includes(this.paramTagItem))
      this.listData = api.data;
    },
    async deleteCart(id) {
      await api.delete(id);
      this.listData = this.listData.filter(food => food.id !== id);
      this.$swal({
        title: 'Success it!',
        delay: 1000
      })
    }
  },
  computed: {
    btnDetail() {
      return this.$i18n.t('information.btnDetail');
    },
    paramLocation() {
      return getRouteParams(this.$route, 'location')
    },
    paramTagItem() {
      return getRouteParams(this.$route, 'tagItem')
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