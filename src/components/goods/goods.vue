<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menu">
			<ul>
				<li v-for="(item, index) in goods" :class="{current: index === current}" class="menu-item" @tap="pickMenu(index)">
					<span class="text border-1px">
						<span v-show="item.type > 0" :class="type[item.type]" class="icon"></span>{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="food">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{ item.name }}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px" @tap="selectFood(food, $event)">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{ food.name }}</h2>
								<p class="desc">{{ food.description }}</p>
								<div class="extra">
									<span class="count">月售 {{ food.sellCount }} 份</span>
									<span>好评率 {{ food.rating }} %</span>
								</div>
								<div class="price">
									<span class="now">¥{{ food.price }}</span>
									<span v-show="food.oldProce" class="old">¥ {{food.oldPrice }}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectFoods="selectFoods" @empty="empty"></shopcart>

		<transition name="zoomDown">
			<food v-if="selectedFood" @hide="selectedFood = ''" :food="selectedFood"></food>
		</transition>
	</div>
</template>

<script>
	import axiox from 'axios'
	import BScroll from 'better-scroll'
	import common from '../../common/js/common'
	import shopcart from '../shopcart/shopcart.vue'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'
	import food from '../food/food.vue'

	export default {
		components: {
			shopcart,
			cartcontrol,
			food,
		},
		props: ['seller'],
		data() {
			return {
				goods: [],
				type: [],
				listHeight: [],
				current: 0,
				menu: '',
				food: '',
				selectedFood: '',
			}
		},
		created() {
			axiox.get(common.api.base_api + common.api.goods)
				.then(res => {
					this.goods = res.data.data
					this.$nextTick(() => {
						this.initScroll()
						this._calculateHeight()
					})
				})
		},
		mounted() {
			this.type = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
		},
		computed: {
			selectFoods() {
				let foods = []
				this.goods.forEach(item => {
					let li
					li = item.foods.filter(({count = 0}) => {
						return count !== 0
					})
					foods.push(...li)
				})
				return foods
			},
		},
		methods: {
			pickMenu(index) {
//				this.current = index
				this.food.scrollTo(0, -this.listHeight[index], 300)
			},
			selectFood(food, event) {
				this.selectedFood = food
			},
			initScroll() {
				/* eslint-disable no-new */
				this.menu = new BScroll(this.$refs['menu'], {
					tap: true,
				})

				/* eslint-disable no-new */
				this.food = new BScroll(this.$refs['food'], {
					probeType: 3,
					tap: true,
				})

				this.food.on('scroll', ({y}) => {
					this.listHeight.forEach((item, index) => {
						if (-y >= item && -y < this.listHeight[index + 1]) {
							this.current = index
						}
					})
				})

				this.food.on('scrollEnd', ({y}) => {
					this.listHeight.forEach((item, index) => {
						if (-y >= item && -y < this.listHeight[index + 1]) {
							this.current = index
						}
					})
				})
			},
			_calculateHeight() {
				let foodList = [...(this.$refs.food.querySelectorAll('.food-list-hook'))]
				let height = 0
				this.listHeight.push(height)
				foodList.forEach(item => {
					height += item.clientHeight
					this.listHeight.push(height)
				})
			},
			empty() {
				this.goods.forEach(item => {
					item.foods.forEach(food => {
						if (food.count && food.count !== 0) {
							food.count = 0
						}
					})
				})
			},
		}
	}
</script>

<style lang="stylus" scoped>
	@import "../../common/style/mixin.styl"
	.goods {
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden

		.menu-wrapper {
			flex: 0 0 80px
			width: 80px
			background #f3f5f7

			.menu-item {
				display: table
				height: 54px
				width: 56px
				padding 0 12px
				line-height: 14px

				&.current {
					position: relative
					z-index 10
					background-color #fff
					font-weight 700
					box-shadow 0 -1px 0 0 #fff

					.text {
						border-none()
					}
				}

				.icon {
					display: inline-block;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					vertical-align: top;
					background-size: 100%;
					&.decrease {
						bg-image('decrease_3')
					}
					&.discount {
						bg-image('discount_3')
					}
					&.guarantee {
						bg-image('guarantee_3')
					}
					&.invoice {
						bg-image('invoice_3')
					}
					&.special {
						bg-image('special_3')
					}
				}

				.text {
					text-align center
					display: table-cell
					width: 56px
					vertical-align middle
					border-1px(rgba(7, 17, 27, 0.1))
					font-size 12px
				}
			}
		}

		.foods-wrapper {
			flex: 1

			.title {
				padding-left: 14px
				height: 26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size 12px
				color: rgb(147, 153, 159)
				background: #f3f5f7
			}

			.food-item {
				display: flex
				margin 18px
				padding-bottom 18px
				border-1px(rgba(7, 17, 27, 0.1))

				&:last-child {
					border-none()
					margin-bottom 0
				}

				.icon {
					flex: 0 0 57px
					margin-right 10px
				}

				.content {
					flex: 1
					.name {
						margin: 2px 0 8px
						height: 14px
						line-height: 14px
						font-size 14px
						color: rgb(7, 17, 27)
					}

					.desc, .extra {
						line-height: 10px
						font-size 10px
						color: rgb(147, 153, 159)
					}

					.desc {
						margin-bottom 8px
						line-height: 12px
					}

					.extra {
						.count {
							margin-right 12px
						}
					}

					.price {
						font-weight: 700
						line-height: 24px

						.now {
							margin-right 8px
							font-size 14px
							color: rgb(240, 20, 20)
						}

						.old {
							text-decoration line-through
							font-size 10px
							color: rgb(147, 153, 159)
						}
					}

					.cartcontrol-wrapper{
						position: absolute
						right: 0
						bottom: 12px
					}
				}
			}
		}


		.fade-enter-active, .fade-leave-active {
			transition all 0.5s
			opacity: 1
		}
		.fade-enter, .fade-leave-to {
			opacity: 0
			background-color rgba(7, 17, 27, 0)
		}
	}
</style>
