<template>
  <div class="w-full">
    <div class="flex h-screen">
      <ul class="bg-white rounded-lg border border-gray-200 w-96 text-gray-900 bg-sky-400">
        <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg bg-blue-500 text-white">
          Manager
        </li>
        <li
            v-for="(task , index) in tasks"
            :key="task"
            :class="idx === index ? 'bg-amber-600' : ''"
            class="px-6 py-2 border-b border-gray-200 w-full hover:cursor-pointer hover:bg-amber-400 hover:text-white"
            @click="change(index , task)"
        >
          {{ task }}
        </li>
      </ul>
      <div class="w-full  p-[10px]">
        <keep-alive>
          <component :is="currentComponent"/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import TableUserComp from "@/components/Table/TableUserComp";
import TableProductComp from "@/components/Table/TableProductComp";
import TableCardOrderComp from "@/components/Table/TableCardOrderComp";

export default {
  name: "PageAdminComp",
  components: {TableUserComp, TableProductComp, TableCardOrderComp},
  data() {
    return {
      currentComponent: TableUserComp,
      idx: 0,
      tasks: ['Users', 'Product', 'List Order']
    }
  },
  methods: {
    change(index, task) {
      this.idx = index;
      switch (task) {
        case 'Users':
          this.currentComponent = TableUserComp
          break;
        case 'Product':
          this.currentComponent = TableProductComp
          break;
        case 'List Order':
          this.currentComponent = TableCardOrderComp
          break;
        default:
          break
      }
    }
  }
}
</script>

<style scoped>

</style>