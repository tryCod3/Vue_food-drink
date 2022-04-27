<template>
  <div class="mt-2.5  cartDetail">
    <div
        class=" h-3/4 overflow-hidden flex justify-between bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CartDetailImage
          :description="this.target.description"
          :image="this.target.image"
          :name="this.target.name"
          :price="this.target.price"
      />
      <CartDetailInformation/>
      <CartDetailSupgget/>
    </div>
  </div>
</template>

<script>
import CartDetailImage from "@/components/Cart/CartDetailImage";
import CartDetailInformation from "@/components/Cart/CartDetailInformation";
import CartDetailSupgget from "@/components/Cart/CartDetailSupgget";
import {prefix} from "@/util";
import INFORMATION from "@/constan/information";
import {API_TABLE} from "@/constan/api";
import {ApiReponsitory} from "@/api/ApiReponsitory";

const api = new ApiReponsitory(API_TABLE.LIST);

export default {
  name: "CartDetailComp",
  components: {CartDetailSupgget, CartDetailInformation, CartDetailImage},
  data() {
    return {
      target: {
        name: 'Some thing error!',
        description: 'pls , let check flow work!',
        price: '0.0',
        image: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
      },
    }
  },
  computed: {
    location: {
      set() {
      },
      get() {
        return this.$store.getters[prefix('informationStore', INFORMATION.LOCATION.GET)]
      }
    },
    item: {
      set() {
      },
      get() {
        return this.$store.getters[prefix('informationStore', INFORMATION.ITEM.GET)]
      }
    }
  },
  methods: {
    async getApiDetail() {
      const params = {signLocation: this.location.name, id: this.$route.params.id}
      await api.call('get', params);
      await api._filter(food => food.tags.includes(this.item))
      if (api.data.length > 0) {
        this.target = api.data[0];
      } else {
        this.target = {
          name: 'Some thing error!',
          description: 'pls , let check flow work!',
          price: '0.0',
          image: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
        }
      }
    }
  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler: 'getApiDetail'
    }
  }
}
</script>

<style scoped>
.cartDetail {
  width: 1200px;
}

</style>