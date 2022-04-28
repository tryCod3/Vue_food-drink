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
  methods: {
    async getApiDetail() {
      const params = {signLocation: this.paramLocation, id: this.$route.params.id}
      console.log(params)
      await api.call('get', params);
      await api._filter(food => food.tags.includes(this.paramTagItem))
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