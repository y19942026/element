<template>
	<div class="header">
		<div class="bg"><img :src="seller.avatar"></div>
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name" v-text="seller.name"></span>
				</div>
				<div class="description">
					{{ seller.description }}/{{ seller.deliveryTime }}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="icon" :class="type[seller.supports[0].type]"></span>
					<span class="text" v-text="seller.supports[0].description"></span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{ seller.supports.length }}个<i class="icon-keyboard_arrow_right"></i></span>
			</div>
		</div>

		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>

		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper">
					<div class="scroll-wrapper">
						<div class="detail-main">
							<h1 class="name">{{ seller.name }}</h1>
							<div class="star-wrapper">
								<star :size="48" :score="seller.score"></star>
							</div>
							<div class="title">
								<div class="line"></div>
								<div class="text">优惠信息</div>
								<div class="line"></div>
							</div>
							<ul v-if="seller.supports" class="supports">
								<li v-for="(item, index) in seller.supports" class="support-item">
									<span class="icon" :class="type[seller.supports[index].type]"></span>
									<span v-text="seller.supports[index].description" class="text"></span>
								</li>
							</ul>
							<div class="title">
								<div class="line"></div>
								<div class="text">商家公告</div>
								<div class="line"></div>
							</div>
							<div class="bulletin">
								<p class="content" v-text="seller.bulletin"></p>
							</div>
						</div>
					</div>
				</div>

				<div class="detail-close">
					<i class="icon-close" @click="hideDetail"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import star from '../star/star.vue'

	export default {
		components: {
			star
		},
		props: ['seller'],
		data() {
			return {
				data: '',
				type: '',
				detailShow: false,
				bs: '',
			}
		},
		mounted() {
			this.data = '我是header1'
		},
		created() {
			this.type = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
		},
		computed: {},
		watch: {
			detailShow(val) {
				if (val) {
					this.$nextTick(() => {
						if (this.bs) {
							this.bs.refresh()
						}
						else {
							this.$nextTick(() => {
								this.bs = new BScroll('.scroll-wrapper', {})
							})
						}
					})
				}
			},
		},
		methods: {
			showDetail() {
				this.detailShow = true
			},
			hideDetail() {
				this.detailShow = false
			},
		}
	}
</script>

<style lang="stylus" scoped>
	@import "../../common/style/base.styl";
	@import "../../common/style/mixin.styl";

	.header {
		overflow: hidden;
		position: relative;

		.bg {
			filter: blur(10px);
			position: absolute;
			z-index: -1;
			width: 100%;

			img {
				width: 100%;
			}
		}
		.content-wrapper {
			font-size: 0;
			color: #fff;
			position: relative;
			background-color: rgba(7, 17, 27, 0.5);

			.avatar {
				display: inline-block;
				margin: 24px 0 18px 24px;

				img {
					border-radius: 8px;
				}
			}

			.content {
				display: inline-block;
				margin-left: 16px;
				font-size: 14px;

				.title {
					margin: 2px 0 8px;
					.brand {
						display: inline-block;
						width: 30px;
						height: 18px;
						vertical-align: top;
						bg-image('brand');
						background-size: 100%;
					}

					.name {
						margin-left: 6px;
						font-size: 16px;
						line-height: 18px;
						font-weight: bold;
					}
				}

				.description {
					margin-bottom: 10px;
					line-height: 12px;
					font-size: 12px;
				}

				.support {
					.icon {
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						vertical-align: top;
						background-size: 100%;
						&.decrease {
							bg-image('decrease_1')
						}
						&.discount {
							bg-image('discount_1')
						}
						&.guarantee {
							bg-image('guarantee_1')
						}
						&.invoice {
							bg-image('invoice_1')
						}
						&.special {
							bg-image('special_1')
						}
					}

					.text {
						line-height: 12px;
						font-size: 10px;
					}
				}
			}

			.support-count {
				position: absolute;
				right: 12px;
				bottom: 18px;
				padding: 0 8px;
				height: 24px;
				line-height: 24px;
				border-radius: 14px;
				background-color: rgba(0, 0, 0, 0.2);
				text-align: center;

				.count {
					vertical-align: top;
					font-size: 10px;
					line-height: 26px;
				}

				.icon-keyboard_arrow_right {
					margin-left: 2px;
					line-height: 24px;
					font-size: 10px;
				}
			}
		}

		.bulletin-wrapper {
			position: relative;
			height: 28px;
			line-height: 25px;
			padding-right: 20px;
			padding-left: 10px;
			ellipsisNormal();
			background-color: rgba(7, 17, 27, 0.2);
			color: #fff;

			.bulletin-title {
				display: inline-block;
				width: 22px;
				height: 12px;
				vertical-align: top;
				margin-top: 8px;
				bg-image('bulletin');
				background-size: 100%;
			}

			.bulletin-text {
				margin-left: 4px;
				font-size: 10px;
				line-height 20px
			}

			.icon-keyboard_arrow_right {
				position: absolute;
				font-size: 10px;
				right: 12px;
				top: 10px;
			}
		}

		.detail {
			position: fixed;
			top: 0;
			z-index: 100;
			width: 100%;
			height: 100%;
			color: #fff;
			overflow: hidden
			transition:	all 0.5s
			background-color: rgba(7, 17, 27, 0.8);
			backdrop-filter blur(10px)
			-webkit-backdrop-filter blur(10px)

			&.fade-enter-active, &.fade-leave-active {
				opacity:1
				background-color: rgba(7, 17, 27, 0.8);
			}
			&.fade-enter, &.fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
				opacity:0
				background-color: rgba(7, 17, 27, 0);
			}

			.detail-wrapper {
				position: absolute;
				bottom: 64px;
				top: 0
				width: 100%;
				overflow: hidden;

				.scroll-wrapper{
					width:100%
					position: absolute
					top: 64px
					bottom: 0

					.name {
						line-height: 16px;
						text-align: center;
						font-size: 16px;
						font-weight: 700;
					}
					.star-wrapper {
						margin-top: 18px;
						padding:2px 0;
						text-align: center;
					}
					.title {
						display: flex;
						width:80%;
						margin:28px auto 24px;

						.line {
							flex:1;
							position: relative;
							top:-6px;
							border-bottom:1px solid rgba(255, 255, 255, 0.2);
						}

						.text{
							padding:0 12px;
							font-weight: 700;
							font-size:14px;
						}
					}

					.supports{
						width:80%;
						margin:0 auto;

						.support-item{
							padding:0 12px;
							margin-bottom: 12px;
							font-size: 0;
							&:last-child{
								margin-bottom: 0;
							}
							.icon{
								display: inline-block;
								width:16px;
								height:16px;
								vertical-align: top;
								margin-right: 6px;
								background-size: 16px;
								background-repeat: no-repeat;

								&.decrease {
									bg-image('decrease_2')
								}
								&.discount {
									bg-image('discount_2')
								}
								&.guarantee {
									bg-image('guarantee_2')
								}
								&.invoice {
									bg-image('invoice_2')
								}
								&.special {
									bg-image('special_2')
								}
							}
							.text{
								line-height: 16px;
								font-size: 12px;
							}
						}
					}

					.bulletin {
						width:80%
						margin:0 auto

						.content{
							padding:0 12px
							line-height:24px
							font-size 12px
						}
					}
				}

			}

			.detail-close {
				position: absolute;
				left: 50%;
				bottom: 32px;
				transform: translate(-50%, 35%);
				font-size: 32px;
				color: rgba(255, 255, 255, 0.5);

				i {
					display: block;
				}
			}
		}
	}
</style>
