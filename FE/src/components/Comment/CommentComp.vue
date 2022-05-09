<template>
  <div>
    <div class="pb-[100px] mt-4 container_comment bg-gray-700">
      <h1 v-if="listReview.length === 0" class="font-bold text-green-50">NO COMMENT</h1>
      <div v-else class="comment_item">
        <div class="flex justify-between">
          <ul class="flex text-gray-50">
            <li class="mx-4" v-for="evaluate in evaluates" :key="evaluate">
              <div>
                <input type="radio">
                <span>{{ evaluate }}</span>
              </div>
            </li>
          </ul>
          <h1 class="text-gray-50">{{ listReview.length }} COMMENTS</h1>
        </div>
        <div v-for="r in listReview" :key="r.review.id" class="w-1/2 ml-[40px] mt-2.5">
          <div class="flex justify-end">
            <StarComp :ratting="r.review.ratting"/>
          </div>
          <div class="flex">
            <h1 class="text-green-50 p-1.5">{{ r.user.user }}</h1>
            <textarea :value="r.review.comment" class="resize-none w-full h-100px] rounded-md"
                      placeholder="write your feelings here..."
                      readonly>
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
import StarComp from "@/components/Common/StarComp";

export default {
  name: "CommentComp",
  components: {StarComp},
  props: {
    listReview: Array
  },
  data() {
    return {
      evaluates: ['all', '1 start', '2 start', '3 start', '4 start', '5 start']
    }
  }
}
</script>

<style scoped>

</style>