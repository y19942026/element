<template>
	<div class="cartcontrol">
		<transition name="trans">
			<div v-show="food.count" class="cart-decrease icon-remove_circle_outline" @tap.stop="decrease"></div>
		</transition>
		<transition name="fade">
			<div v-show="food.count" class="cart-count">{{ food.count }}</div>
		</transition>
		<div class="cart-add icon-add_circle" @tap.stop="addCart"></div>
	</div>
</template>

<script>
	export default {
		props: {
			food: {
				type: Object,
			}
		},
		data() {
			return {
			}
		},
		mounted() {
		},
		created() {
		},
		computed: {},
		methods: {
			addCart() {
				if (!this.food.count) {
					this.$set(this.food, 'count', 1)
//					this.food.count = 1
				}
				else {
					this.food.count++
				}
			},
			decrease() {
				if (this.food.count > 0) {
					this.food.count--
				}
			},
		}
	}
</script>

<style lang="stylus" scoped>
	.cartcontrol{
		font-size 0
		.cart-decrease, .cart-add{
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size 24px
			color: rgb(0, 160, 220)
		}

		.cart-count{
			display: inline-block
			vertical-align top
			width: 12px
			padding-top 6px
			line-height: 24px
			text-align center
			font-size 10px
			color: rgb(147, 153, 159)
		}

		.cart-add{
			display: inline-block
		}
	}

	$time = 0.3s

	.trans-enter-active, .trans-leave-active {
		transition: all $time ease
	}
	.trans-enter, .trans-leave-to /* .trans-leave-active in below version 2.1.8 */ {
		transform: translate3D(48px, 0, 0) rotate(360deg)
		opacity: 0
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity $time
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
		opacity: 0
	}
</style>
