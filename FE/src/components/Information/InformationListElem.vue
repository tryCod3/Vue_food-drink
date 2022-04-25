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
                src="@/assets/image/window12.png"
                alt="square icon"
                class="mr-0.5 object-contain"
            />
            <router-view class="text-sky-600 hover:cursor-pointer">{{ getAllList }}</router-view>
          </div>
        </div>
        <!-- grid grid-cols-3 gap-2 -->
        <div class="grid grid-cols-3 gap-2 p-2">
          <CartComp v-for="(food , index) in listfood" :key="index"
                    :name="food.name"
                    :description="food.description"
                    :btn="btnDetail"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartComp from "@/components/Cart/CartComp";

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
    priority() {
      return this.$i18n.t('information.priority')
    },
    getAllList() {
      return this.$i18n.t('information.getAllList')
    },
    btnDetail() {
      return this.$i18n.t('information.btnDetail')
    }

  }
};
</script>

<style></style>
