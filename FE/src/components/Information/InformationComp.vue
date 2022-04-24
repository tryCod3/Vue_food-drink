<template>
	<div class="w-full flex relative text-white information">
		<InformationTagElem />
		<InformationListElem />
	</div>
</template>

<script>
import InformationTagElem from "@/components/Information/InformationTagElem.vue";
import InformationListElem from "@/components/Information/InformationListElem.vue";
export default {
	name: "InformationComp",
	components: { InformationTagElem, InformationListElem },
};
</script>

<style scoped>
.information {
	width: 1200px;
}
</style>
