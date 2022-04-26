<template>
  <div
      class="relative z-auto pl-4 mt-[20px] h-[700px] overflow-auto information__listfood"
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
                  :to="{name: 'locationsItemFilter' , params: {location: location.name , tagItem: item , filter: 'all' } }">
                {{
                  getAllList
                }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 p-2">
          <CartComp v-for="(food , index) in listfood" :key="index"
                    :btn="btnDetail"
                    :description="food.description"
                    :name="food.name"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartComp from "@/components/Cart/CartComp";
import {prefix} from "@/util";
import INFORMATION from "@/constan/information";


export default {
  name: "informationlistElem",
  components: {
    CartComp
  },
  data() {
    return {
      listfood: [
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
        {
          img: "@/assets/image/listfood.jpg",
          name: "Quán Ăn Phương Mập",
          description: "14 An Nhơn 9 , p.Mỹ An , Đà Nẵng",
        },
      ],
    };
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
    ,
    priority() {
      return this.$i18n.t('information.priority')
    },
    getAllList() {
      return this.$i18n.t('information.getAllList')
    },
    btnDetail() {
      return this.$i18n.t('information.btnDetail')
    },

  }
};
</script>

<style></style>
