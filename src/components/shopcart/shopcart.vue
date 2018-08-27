<template>
	<div class="wrapper">
		<transition name="fade">
			<div v-show="shopcartShow" class="mask" @click="shopcartTap"></div>
		</transition>
		<div class="shopcart">
			<div class="content" :class="{highlight: totalCount}">
				<div class="content-left" @click="shopcartTap">
					<div class="logo-wrapper">
						<div class="logo"><span class="icon-shopping_cart"></span></div>
						<div v-if="totalCount" class="num">{{ totalCount }}</div>
					</div>
					<div class="price">¥{{ totalPrice }}元</div>
					<div class="desc">另需配送费{{ deliveryPrice }}元</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="{enough: payStatus.status === 2}">
						{{ payStatus.msg }}
					</div>
				</div>

				<transition name="fold">
					<div v-show="shopcartShow" class="shopcart-list">
						<div class="list-header">
							<h1 class="title">购物车</h1>
							<span class="empty" @click="empty">清空</span>
						</div>
						<div class="list-content" ref="list">
							<ul>
								<li class="food" v-for="food in selectFoods">
									<span class="name" v-text="food.name"></span>
									<div class="price">
										<span> {{ food.price * food.count }}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'
	export default {
		components: {
			cartcontrol
		},
		props: {
			deliveryPrice: {
				default: 0,
			},
			minPrice: {
				default: 0,
			},
			selectFoods: {
				type: Array,
				default() {
					return []
				},
			},
		},
		data() {
			return {
				fold: true,
			}
		},
		mounted() {
		},
		created() {
		},
		watch: {
			selectFoods(value) {
				if (!value.length) {
					this.fold = true
					return false
				}
				this.$nextTick(() => {
					if (!this.list) {
						this.list = new BScroll(this.$refs['list'], {
							tap: true,
							click: true,
						})
					}
					else {
						this.list.refresh()
					}
				})
			},
		},
		computed: {
			totalPrice() {
				let price = 0
				this.selectFoods.forEach(item => {
					price += item.price * item.count
				})
				return price
			},
			totalCount() {
				let count = 0
				this.selectFoods.forEach(item => {
					count += item.count
				})
				return count
			},
			payStatus() {
				if (this.totalPrice === 0) {
					return {
						status: 0,
						msg: `¥${this.minPrice}元起送`
					}
				}
				else if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice
					return {
						status: 1,
						msg: `还差¥${diff}元起送`
					}
				}
				else {
					return {
						status: 2,
						msg: `去结算`
					}
				}
			},
			shopcartShow() {
				if (!this.selectFoods.length) {
					return false
				}

				return !this.fold
			},
		},
		methods: {
			shopcartTap() {
				if (!this.selectFoods.length) {
					return false
				}

				this.fold = !this.fold
				if (!this.fold) {
					this.$nextTick(() => {
						if (!this.list) {
							this.list = new BScroll(this.$refs['list'], {
								tap: true,
								click: true,
							})
						}
						else {
							this.list.refresh()
						}
					})
				}
			},
			empty() {
				this.$emit('empty')
			},
		},
	}
</script>

<style lang="stylus" scoped>
	@import "../../common/style/mixin.styl"

	.wrapper{
		position: relative
		.mask{
			position: fixed
			top: 0
			left: 0
			width: 100%
			height:100%
			background-color rgba(7, 17, 27, 0.6)

			&.fade-enter-active, &.fade-leave-active {
				transition all 0.5s
				opacity: 1
			}
			&.fade-enter, &.fade-leave-to {
				opacity: 0
				background-color rgba(7, 17, 27, 0)
			}
		}
		.shopcart {
			position fixed
			left: 0
			bottom: 0
			z-index 50
			width: 100%
			height: 48px
			background-color #000

			.content {
				display: flex
				background-color #141d27
				font-size 0
				color: rgba(255, 255, 255, 0.4)

				&.highlight{
					.logo{
						background-color rgb(0, 160, 220) !important

						.icon-shopping_cart{
							color: #fff !important
						}
					}

					.price{
						color: #fff !important
					}
				}

				.content-left {
					flex: 1

					.logo-wrapper {
						display inline-block
						position relative
						top: -10px
						margin 0 12px
						padding 6px
						width: 56px
						height: 56px
						box-sizing border-box
						vertical-align top
						border-radius 50%
						background-color #141d27

						.logo {
							width: 100%
							height: 100%
							border-radius 50%
							text-align center
							background-color: #2b343c

							.icon-shopping_cart {
								line-height: 44px
								font-size 24px
								color: #80858a
							}
						}

						.num {
							position absolute
							top: 0
							right: 0
							width: 24px
							height: 16px
							line-height: 16px
							text-align center
							border-radius 16px
							font-size 9px
							font-weight: 700
							color: #fff
							background-color rgb(240, 20, 20)
							box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
						}
					}

					.price {
						display inline-block
						vertical-align top
						margin-top 12px
						line-height: 24px
						padding-right: 12px
						box-sizing border-box
						border-right: 1px solid rgba(255, 255, 255, 0.1)
						font-size 16px
						font-weight 700
						color: rgba(255, 255, 255, 0.4)
					}

					.desc {
						display inline-block
						vertical-align top
						margin 12px 0 0 12px
						line-height: 24px
						font-size 10px
					}
				}

				.content-right {
					flex: 0 0 105px
					width: 105px

					.pay {
						height: 48px
						line-height: 48px
						text-align center
						font-size 12px
						font-weight 700
						background-color #2b333b

						&.enough{
							color: #fff
							background-color #00b43c
						}
					}
				}
			}

			.shopcart-list{
				position: absolute
				left: 0
				top: 0
				z-index -1
				width: 100%
				transform translate3d(0, -100%, 0)

				&.fold-enter-active, &.fold-leave-active {
					transition all 0.2s linear
					transform translate3d(0, -100%, 0)
				}
				&.fold-enter, &.fold-leave-to /* .fold-leave-active in below version 2.1.8 */ {
					transform: translate3d(0, 0, 0)
				}

				.list-header{
					height:40px
					line-height: 40px
					padding:0 18px
					background-color #f3f5f7
					border-bottom:1px solid rgba(7, 17, 27, 0.1)

					.title{
						float: left
						font-size 14px
						color: rgb(7, 17, 27)
					}

					.empty{
						float: right
						font-size 12px
						color: rgb(0, 160, 220)
					}
				}

				.list-content{
					padding:0 18px
					max-height: 217px
					overflow hidden
					background-color #fff

					.food {
						position: relative
						padding 12px 0
						box-sizing border-box
						border-1px(rgba(7, 17, 27, 0.1))

						.name{
							line-height: 24px
							font-size 14px
							color: rgb(7, 17, 27)
						}

						.price{
							position: absolute
							right: 90px
							bottom: 12px
							line-height: 24px
							font-size 14px
							font-weight 700
							color: rgb(240, 20, 20)
						}

						.cartcontrol-wrapper{
							position: absolute
							right: 0
							bottom: 6px
						}
					}
				}
			}
		}
	}
</style>
