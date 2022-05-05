<template>
  <div class="w-[800px]  flex justify-between ">
    <div class="self-center  w-[40px]">
      <div class="w-[40px] h-[40px] bg-amber-400 rounded-full relative">
        <img @click="()=>{
              this.index--;
              this.index = this.index + this.listReview.length
              this.index = this.index % this.listReview.length
            }" alt="icon left" class="hover:cursor-pointer  mx-auto absolute top-2 right-2"
             src="@/assets/image/left.png"/>
      </div>
    </div>
    <div v-if="listReview.length > 0" class="overflow-hidden h-full   justify-center py-[20px]">
      <div class="w-full h-full float-left dark:bg-slate-900 rounded p-5">
        <div class="flex h-1/3">
          <div class="w-[400px]">
            <img :src="listReview[index].data.image" alt="image feedback" class="shrink-0 h-40 w-40 rounded-full">
          </div>
          <div class="w-full pt-[20px] pl-[5px]">
            <ul class=" marker:text-green-500 list-disc pl-5 space-y-3 text-white" role="list">
              <li>{{ listReview[index].data.name }}</li>
              <li>{{ listReview[index].data.location }}</li>
              <li>
                {{ listReview[index].data.price }}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span class="underline decoration-sky-500 font-bold text-green-50 ">
            Vote Me:
          </span>
          <div class="flex justify-center">
            <button v-for="i in 5" :key="i" :class="{ 'mr-1': i < 5 }" @click="star(listReview[index].data.id , i)">
              <svg :class="[ listReview[index].review >= i ? 'text-amber-400': 'text-white']" class="block h-8 w-8"
                   fill="currentColor"
                   viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            </button>
          </div>
          <span class="underline decoration-sky-500 font-bold text-green-50">
            Review For You:
          </span>
          <div class="p-5 pt-[40px]">
            <textarea v-model="comment[index]" class="resize-none w-full h-[200px] rounded-md"
                      placeholder="write your feelings here...">
            </textarea>
          </div>
          <div class="flex justify-end pr-5">
            <button class="flex px-4 py-2 bg-emerald-700 text-green-50 rounded" @click="handleSubmitReview">
              Submit Review
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 pl-[2px]" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="self-center w-[40px]">
      <div class="w-[40px] h-[40px] bg-amber-400 rounded-full relative">
        <img
            @click="()=>{
              this.index++;
              this.index = this.index % this.listReview.length
            }"
            alt="icon right"
            class="hover:cursor-pointer mx-auto absolute top-2 right-2" src="@/assets/image/right.png"/>
      </div>
    </div>
  </div>
</template>

<script>

import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";
import {genId} from "@/util";

const api = new ApiReponsitory(API_TABLE.CART)
const api_list = new ApiReponsitory(API_TABLE.LIST)
const api_review = new ApiReponsitory(API_TABLE.REVIEW)

export default {
  name: "FormFeedBack",
  created() {
    this.loadApi()
  },
  data() {
    return {
      listReview: [],
      index: 0,
      reComment: [],
      comment: []
    }
  },
  methods: {
    async loadApi() {
      await api.call('get', {id: this.idCart})
      const list = api.data[0]
      for (let i = 0; i < list.lists.length; i++) {
        await api_list.call('get', {id: list.lists[i].idCart})
        if (api_list.data.length > 0)
          this.listReview.push({data: api_list.data[0], review: 3})
      }
    },
    star(id, star) {
      for (let i = 0; i < this.listReview.length; i++) {
        if (this.listReview[i].data.id === id) {
          this.listReview[i].review = star
          break
        }
      }
    },
    async handleSubmitReview() {
      const model = {
        id: genId('review'),
        replyFood: this.listReview[this.index].data.id,
        ratting: this.listReview[this.index].review,
        comment: this.comment[this.index],
        idUser: this.idCart,
        createAt: Date.now()
      }
      this.$swal({
        title: 'Add Comment for Cart?',
        text: "We apologize if your comment is negative!",
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add comment!',
        cancelButtonText: 'No, cancel!',
      }).then(async res => {
        if (res.isConfirmed) {
          await api_review.add(model)
          this.$swal({
            title: 'Success it!',
            delay: 1000
          })
        }
      })
      await api_review.add(model)
    }
  },
  computed: {
    idCart: {
      set() {
      },
      get() {
        return this.$route.params.id;
      }
    }
  }
}
</script>

<style scoped>

</style>