<template>
	<div class="wrapper" ref="food">
		<div class="food">
			<div class="food-content">
				<div class="header">
					<img :src="food.image">
					<div class="back" @tap="hide" @click="hide">
						<i class="icon-arrow_left"></i>
					</div>
				</div>

				<div class="content">
					<h1 class="title" v-text="food.name"></h1>
					<div class="detail">
						<span class="sell-count">月售{{ food.sellCount }}</span>
						<span class="rating">好评率{{ food.rating }}</span>
					</div>

					<div class="price">
						<span class="now">¥{{ food.price }}</span>
						<span class="old" v-if="food.oldPrice">¥{{ food.oldPrice }}</span>
					</div>

					<div class="cartcontrol-wrapper">
						<cartcontrol ref="cc" :food="food"></cartcontrol>
					</div>

					<div class="buy" v-show="!food.count" @click="addFirst">加入购物车</div>
				</div>
			</div>

			<split v-show="food.info"></split>

			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{ food.info }}</p>
			</div>

			<split></split>

			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
							  :ratings="food.ratings"></ratingselect>

				<div class="rating-wrapper">
					<ul v-if="food.ratings && food.ratings.length">
						<li v-for="rating in food.ratings" class="rating-item">
							<div class="user">
								<span class="name">{{ rating.username }}</span>
								<img :src="rating.avatar" width="12" height="12" class="avatar">
							</div>

							<div class="time">{{ rating.rateTime | formatDate }}</div>

							<p class="text">
								<span
									:class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
								{{ rating.text }}
							</p>
						</li>
					</ul>

					<div v-else class="no-rating">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import {formatDate} from '../../common/js/date'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'
	import ratingselect from '../ratingselect/ratingselect.vue'
	import split from '../split/split.vue'

	const ALL = 0
	//	const NEGATIVE = 1
	//	const POSITION = 2

	export default {
		components: {
			cartcontrol,
			split,
			ratingselect,
		},
		props: {
			food: {
				type: Object
			},
		},
		data() {
			return {
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽',
				},
			}
		},
		mounted() {
		},
		created() {
			this.selectType = ALL
			this.onlyContent = true
			this.$nextTick(() => {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.food, {
						click: true,
						tap: true,
					})
				}
				else {
					this.scroll.refresh()
				}
			})
		},
		computed: {},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		methods: {
			hide() {
				this.$emit('hide')
			},
			addFirst() {
				console.log(this.$refs.cc)
				this.$refs.cc.addCart()
			},
		}
	}
</script>

<style lang="stylus" scoped>
	@import "../../common/style/mixin.styl"

	.wrapper {
		position: fixed
		left: 0
		top: 0
		bottom: 48px
		z-index 30
		width: 100%
		background: #fff

		.food {

			.header {
				position: relative
				width: 100%
				height: 0
				padding-top: 100%
				overflow: hidden

				img {
					position: absolute
					top: 0
					left: 0
					width: 100%
					display: block
				}

				.back {
					position: absolute
					top: 10px
					left: 0

					.icon-arrow_left {
						display: block
						padding: 10px
						font-size 20px
						color: #fff
					}
				}
			}

			.content {
				position: relative
				padding 18px

				.title {
					line-height: 14px
					margin-bottom 8px
					font-size 14px
					font-weight: 700
					color: rgb(7, 17, 27)
				}

				.detail {
					margin-bottom 18px
					line-height: 10px
					font-size 0

					.sell-count, .rating {
						font-size 10px
						color: rgb(147, 153, 159)
					}

					.sell-count {
						margin-right 12px
					}
				}

				.cartcontrol-wrapper {
					position: absolute
					right: 12px
					bottom 12px
				}

				.buy {
					position: absolute
					right: 18px
					bottom: 18px
					z-index 10
					height: 24px
					line-height: 24px
					padding: 0 12px
					box-sizing border-box
					border-radius 12px
					font-size 10px
					color: #fff
					background-color rgb(0, 160, 220)
				}
			}

			.info {
				padding: 14px

				.title {
					line-height: 14px
					margin-bottom 6px
					font-size 14px
					color: rgb(7, 17, 27)
				}

				.text {
					line-height: 24px
					padding 0 8px
					font-size 12px
					color: rgb(77, 85, 93)
				}
			}

			.rating {
				padding-top 18px

				.title {
					line-height: 14px
					margin-left 18px
					font-size 14px
					color: rgb(7, 17, 27)
				}

				.rating-wrapper {
					padding 0 18px

					.rating-item {
						position: relative
						padding 16px 0
						border-1px(rgba(7, 17, 27, 0.1))

						.user {
							position: absolute
							right: 0
							top: 16px
							line-height: 12px
							font-size 0

							.name {
								display: inline-block
								vertical-align top
								margin-right 6px
								font-size 10px
								color: rgb(147, 153, 159)
							}

							.avatar {
								border-radius 50%
							}
						}

						.time {
							margin-bottom 6px
							line-height: 12px
							font-size 10px
							color: rgb(147, 153, 159)
						}

						.text {
							line-height: 16px
							font-size 12px
							color: rgb(7, 17, 27)

							.icon-thumb_up, .icon-thumb_dowm {
								margin-right 4px
								line-height: 24px
								font-size 14px

								&.icon-thumb_up {
									color: rgb(0, 160, 220)
								}

								&.icon-thumb_dowm {
									color: rgb(147, 153, 159)
								}
							}
						}
					}


					.no-rating {
						padding: 16px 0
						font-size 12px
						color: rgb(147, 153, 159)
					}
				}
			}
		}
	}
</style>
