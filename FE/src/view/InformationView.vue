<template>
	<section>
		<div
			class="h-screen fixed top-[70px] w-full overflow-hidden z-0 flex justify-center bg-cover bg-[url('@/assets/image/main-banner.jpg')] container__information"
		>
			<InformationComp />
		</div>
	</section>
</template>

<script>
import InformationComp from "@/components/Information/InformationComp";
export default {
	name: "InformationView",
	components: {
		InformationComp,
	},
};
</script>

<style scoped></style>
