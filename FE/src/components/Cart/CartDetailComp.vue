<template>
  <div class=" mt-2.5  cartDetail">
    <div
        class=" h-[600px] overflow-hidden flex justify-between bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CartDetailImage
          :description="target.description"
          :image="target.image"
          :name="target.name"
          :price="target.price"
          :ratting="ratting"
          :id="paramId"
      />
      <CartDetailSupgget :item="paramTagItem" :location="paramLocation"/>
    </div>
    <CommentComp :list-review="listReview"/>
  </div>
</template>

<script>
import CartDetailSupgget from "@/components/Cart/CartDetailSupgget";
import {API_TABLE} from "@/constan/api";
import {ApiReponsitory} from "@/api/ApiReponsitory";
import {getAccount} from "@/util";
import {getRattingFood, getRouteParams} from "@/util/app";
import CartDetailImage from "@/components/Cart/CartDetailImage";
import CommentComp from "@/components/Comment/CommentComp";

const api = new ApiReponsitory(API_TABLE.LIST);
const api_acc = new ApiReponsitory(API_TABLE.ACCOUNT)
const api_review = new ApiReponsitory(API_TABLE.REVIEW)

export default {
  name: "CartDetailComp",
  components: {CommentComp, CartDetailImage, CartDetailSupgget},
  data() {
    return {
      target: {
        name: 'Some thing error!',
        description: 'pls , let check flow work!',
        price: '0.0',
        image: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
      },
      ratting: 0,
      listReview: []
    }
  },
  methods: {
    async getApiReview() {
      this.listReview = []
      await api_review._call('get', {replyFood: this.$route.params.id})
      for (let i = 0; i < api_review.data.length; i++) {
        await api_acc._call('get', {id: api_review.data[i].idUser})
        if (api_acc.data.length > 0) {
          this.listReview.push({user: api_acc.data[0], review: api_review.data[i]})
        }
      }
      await getRattingFood(api_review, this.$route.params.id).then(res => {
        this.ratting = res
      })
    },
    async getApiDetail() {
      const params = {signLocation: this.paramLocation, id: this.$route.params.id}
      await api._call('get', params);
      await api._filter(food => food.tags.includes(this.paramTagItem))
      if (api.data.length > 0) {
        this.target = api.data[0];
        await this.getApiReview()
      } else {
        this.target = {
          name: 'Some thing error!',
          description: 'pls , let check flow work!',
          price: '0.0',
          image: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'
        }
      }
    },
  },
  computed: {
    paramLocation() {
      return getRouteParams(this.$route, 'location')
    },
    paramTagItem() {
      return getRouteParams(this.$route, 'tagItem')
    },
    paramId() {
      return getRouteParams(this.$route, 'id')
    },
    role() {
      return getAccount() ?? ''
    },
    btnDetail() {
      return this.$i18n.t('information.btnDetail')
    },
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


</style>