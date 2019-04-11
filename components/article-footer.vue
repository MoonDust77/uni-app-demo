<template>
	<view class="footer flex">
		<view class="like-box flex" v-if="showLike">
			<view class="icon-like"></view><text>点赞</text>
		</view>
		<view class="flex">
			<text>浏览{{browseCount}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			browseCount: {
				type: Number,
				default: 0
			},
			showLike: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style>
	.footer {
		justify-content: flex-end;
		align-items: center;
		font-size: 22upx;
		color: #999;
		height: 76upx;
	}
	.like-box {
		margin-right: 52upx;
	}
	.icon-like {
		width: 32upx;
		height: 32upx;
		background: url('~@/static/icon_dianzan_n@2x.png');
		background-size: contain;
		margin-right: 8upx;
	}
</style>
