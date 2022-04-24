<template>
	<div
		class="flex justify-center border hover:bg-black-500 hover:shadow-lgs"
		:class="style"
	>
		<div class="rounded-lg shadow-lg bg-white max-w-sm">
			<a href="#!" class="relative">
				<slot name="cart.image"> </slot>
				<span class="absolute -top-1 -left-1 flex h-3 w-3">
					<span
						class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-1"
					></span>
					<span
						class="relative inline-flex rounded-full h-3 w-3 bg-lime-500"
					></span>
				</span>
			</a>
			<div class="px-[5px] py-[8px]">
				<slot name="cart.information"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CartFoodSlot",
	props: {
		vertical: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			style: {
				"flex-row": !this.vertical,
				"flex-col": this.vertical,
			},
		};
	},
};
</script>

<style></style>
