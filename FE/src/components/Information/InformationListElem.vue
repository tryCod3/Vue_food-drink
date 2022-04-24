<template>
	<div
		class="relative z-auto pl-4 mt-[20px] h-[700px] overflow-auto information__listfood"
	>
		<div class="">
			<div class="p-[14px] bg-white">
				<div class="flex justify-between">
					<h2 class="text-black">Ưu đãi</h2>
					<div class="flex">
						<img
							src="@/assets/image/window12.png"
							alt="square icon"
							class="mr-0.5 object-contain"
						/>
						<p class="text-sky-600">Xem tất cả</p>
					</div>
				</div>
				<!-- grid grid-cols-3 gap-2 -->
				<div class="grid grid-cols-3 gap-2 p-2">
					<CartFoodSlot v-for="food in listfood" :key="food">
						<img
							slot="cart.image"
							class="rounded-t-lg hover:skew-y-3 delay-150 duration-300 ease-in-out"
							src="@/assets/image/listfood.jpg"
							alt="icon avatar"
						/>
						<div slot="cart.information">
							<h5
								class="text-gray-900 text-xl font-medium mb-2 truncate ..."
							>
								{{ food.name }}
							</h5>
							<p
								class="text-gray-700 text-base mb-4 truncate ..."
							>
								{{ food.description }}
							</p>
							<div class="flex justify-between">
								<button
									type="button"
									class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								>
									Detail
								</button>
								<img
									src="@/assets/image/dots30.png"
									alt="icon setting for admin"
									class="hover:border-2 hover:rounded-full hover:border-amber-500 hover:cursor-pointer"
								/>
							</div>
						</div>
					</CartFoodSlot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CartFoodSlot from "@/slot/CartFoodSlot.vue";
export default {
	name: "informationlistElem",
	components: {
		CartFoodSlot,
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
};
</script>

<style></style>
