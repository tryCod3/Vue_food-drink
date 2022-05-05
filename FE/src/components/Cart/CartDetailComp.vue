<template>
  <div class=" mt-2.5  cartDetail">
    <div
        class=" h-3/4 overflow-hidden flex justify-between bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <CartDetailImage
          :description="this.target.description"
          :image="this.target.image"
          :name="this.target.name"
          :price="this.target.price"
          :ratting="ratting"
      />
      <CartDetailInformation/>
      <CartDetailSupgget :item="paramTagItem" :location="paramLocation"/>
    </div>
    <h1>Review:</h1>
    <div class="pb-[100px] mt-4 container_comment bg-gray-700">
      <h1 v-if="listReview.length === 0" class="font-bold text-green-50"> NO COMMENT</h1>
      <div class="comment_item">
        <div class="w-1/2 ml-[40px] mt-2.5" v-for="r in listReview" :key="r.review.id">
          <div class="flex justify-end">
            <div class="flex justify-center">
              <button v-for="i in 5" :key="i" :class="{ 'mr-1': i < 5 }">
                <svg :class="[ r.review.ratting >= i ? 'text-amber-400': 'text-white']" class="block h-8 w-8"
                     fill="currentColor"
                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="flex">
            <h1 class="text-green-50 p-1.5">{{ r.user.user }}</h1>
            <textarea readonly :value="r.review.comment" class="resize-none w-full h-100px] rounded-md"
                      placeholder="write your feelings here...">
            </textarea>
          </div>
          <div class="my-2"></div>
          <hr/>
        </div>
      </div>
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
const api_acc = new ApiReponsitory(API_TABLE.ACCOUNT)
const api_review = new ApiReponsitory(API_TABLE.REVIEW)

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
      ratting: 0,
      listReview: []
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
    async getAiReview() {
      this.listReview = []
      this.ratting = 0
      await api_review.call('get', {replyFood: this.$route.params.id})
      for (let i = 0; i < api_review.data.length; i++) {
        await api_acc.call('get', {id: api_review.data[i].idUser})
        if (api_acc.data.length > 0) {
          this.listReview.push({user: api_acc.data[0], review: api_review.data[i]})
          this.ratting += api_review.data[i].ratting;
        }
      }
      this.ratting /= this.listReview.length;
      if (this.ratting > 5) this.ratting = 5
    },
    async getApiDetail() {
      const params = {signLocation: this.paramLocation, id: this.$route.params.id}
      await api.call('get', params);
      await api._filter(food => food.tags.includes(this.paramTagItem))
      if (api.data.length > 0) {
        this.target = api.data[0];
        await this.getAiReview()
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