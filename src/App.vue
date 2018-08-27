<template>
	<div id="app">
		<vHeader :seller="seller"></vHeader>
		<div class="tab border-1px">
			<router-link to="/goods" class="tab-item" tag="div">商品</router-link>
			<router-link to="/ratings" class="tab-item" tag="div">评论</router-link>
			<router-link to="/seller" class="tab-item" tag="div">商家</router-link>
			<!--<div class="tab-item">商品</div>
			<div class="tab-item">评论</div>
			<div class="tab-item">商家</div>-->
		</div>
		<div class="content">
			<keep-alive>
				<router-view :seller="seller"></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import common from './common/js/common'
	import vHeader from 'components/header/header.vue'

	export default {
		name: 'app',
		components: {
			vHeader
		},
		data() {
			return {
				seller: '',
			}
		},
		created() {
			axios.get(common.api.base_api + common.api.seller)
				.then(res => {
					let data = res.data
					if (data.code === 0) {
						this.seller = data.data
					}
				})
		}
	}
</script>

<style lang="less" scoped>
	@import "common/less/mixin";

	#app {
		.tab {
			display: flex;
			height: 40px;
			line-height: 40px;
			.border-1px(rgba(7, 17, 27, 0.1));

			.tab-item {
				flex: 1;
				text-align: center;
				color: rgb(77, 85, 93);

				&.active {
					color: rgb(240, 20, 20);
				}
			}
		}
	}
</style>
