<template>
	<nav :class="style.header" class="header">
		<div class="flex justify-between">
			<div class="self-center display header__img">
				<img
					alt="icon shope"
					class="laptop:pr-20"
					src="@/assets/image/shopeefoodvn.png"
				/>
			</div>
			<div class="self-center header__location">
				<div
					:class="style.header__location__link"
					class="btn bg-[#f0f0f0] hover:cursor-pointer rounded header__location__link"
				>
					<h3>Đà Nẵng</h3>
					<img
						class="self-center"
						src="@/assets/image/icondown12.png"
					/>
				</div>
			</div>
		</div>
		<div class="flex flex-row flex-1">
			<div
				:class="style.header__typefood"
				class="self-center flex-1 tablet:pl-12 header__typefood"
			>
				<div
					v-for="type in typesFood"
					:key="type"
					class="h-full float-left pt-2.5 px-3 pb-4 hover:border hover:border-t-0 hover:border-l-0 hover:border-r-0 hover:border-[#ee4d2d] hover:text-[#ee4d2d] hover:cursor-pointer"
				>
					<span class="self-center">{{ type }}</span>
				</div>
			</div>
			<div class="self-center p-5 header__search">
				<img
					alt="icon search"
					src="@/assets/image/iconfind24.png"
					class="hover:cursor-pointer"
				/>
			</div>
			<div
				class="self-center border border-[#ee4d2d] text-[#ee4d2d] rounded header__login"
			>
				<button class="btn">Đăng Nhập</button>
			</div>
		</div>
		<div class="flex justify-center">
			<select class="laptop:absolute top-5 right-2 hover:cursor-pointer">
				<option value="vn">Tiếng Việt</option>
				<option value="en">Tiếng Anh</option>
			</select>
		</div>
	</nav>
</template>

<script>
export default {
	name: "HeaderComp",
	data() {
		return {
			typesFood: [
				"Đồ ăn",
				"Thực phẩm",
				"Bia",
				"Hoa",
				"Siêu thị",
				"Thuốc",
				"Thú cưng",
			],
			style: {
				header: {
					"laptop:flex": true,
					"laptop:flex-row": true,
				},
				header__typefood: {
					"float-left": true,
				},
				header__location__link: {
					flex: true,
					"flex-row": true,
				},
			},
		};
	},
};
</script>

<style scoped>
.header {
	width: 1200px;
}
</style>
