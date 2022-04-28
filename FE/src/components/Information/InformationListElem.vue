<template>
  <div
      class="relative z-auto pl-4 mt-[20px] h-[700px] overflow-auto information__listFood"
  >
    <div class="">
      <div class="p-[14px] bg-white">
        <div class="flex justify-between">
          <h2 class="text-black">{{ priority }}</h2>
          <div class="flex">
            <img
                alt="square icon"
                class="mr-0.5 object-contain"
                src="@/assets/image/window12.png"
            />
            <div
                class="text-sky-600 hover:cursor-pointer">
              <router-link
                  :to="{name: 'location-item-watch' , params: {location: paramLocation , tagItem: paramTagItem } }"
              >
                {{
                  getAllList
                }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 p-2">
          <CartComp v-for="(food) in listFood" :id="food.id"
                    :key="food.id"
                    :btn="btnDetail"
                    :description="food.description"
                    :image="food.image"
                    :name="food.name"
          />
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import CartComp from "@/components/Cart/CartComp";
import {ApiReponsitory} from "@/api/ApiReponsitory";
import {API_TABLE} from "@/constan/api";

const api = new ApiReponsitory(API_TABLE.LIST);
console.log("create information")


export default {
  name: "informationlistElem",
  components: {
    CartComp
  },
  data() {
    return {
      listFood: [],
    }
  },
  methods: {
    async getApi() {
      console.log("join get api")
      const params = {signLocation: this.paramLocation};
      await api.call('get', params)
      await api._filter(food => food.tags.includes(this.paramTagItem))
      this.listFood = api.data;
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
    priority() {
      return this.$i18n.t('information.priority')
    },
    getAllList() {
      return this.$i18n.t('information.getAllList')
    },
    btnDetail() {
      return this.$i18n.t('information.btnDetail')
    },

  },
  watch: {
    '$route': {
      immediate: true,
      deep: true,
      handler: 'getApi'
    }
  }
};
</script>

<style></style>
