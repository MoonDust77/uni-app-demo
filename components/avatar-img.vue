<template>
	<view class="avatar-box">
		<image class="avatar" :src="host.imgHost + headPicUrl" mode="" :style="{'height': avatarHeight + 'upx', 'width': avatarHeight + 'upx'}"></image>
		<view class="icon-v" :class="[size === 'big' ? 'big' : 'small']"></view>
	</view>
</template>

<script>
	import {host} from '@/api'
	export default {
		props: {
			headPicUrl: {
				type: String,
				default: ''
			},
			avatarHeight: {
				type: Number,
				default: 52
			}
		},
		data() {
			return {
				host: host
			}
		},
		computed: {
			size() {
				let size = 'small'
				if (this.avatarHeight > 100) {
					size = 'big'
				}
				return size
			}
		}
	}
</script>

<style>
	.avatar-box {
		position: relative;
	}
	.avatar {
		height: 52upx;
		width: 52upx;
		border-radius: 100%;
	}
	.icon-v {
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.icon-v.small {
		height: 20upx;
		width: 20upx;
		background-image: url('~@/static/icon_v_small@2x.png');
		background-size: contain;
	}
	.icon-v.big {
		height: 32upx;
		width: 32upx;
		background-image: url('~@/static/icon_v_big@2x.png');
		background-size: contain;
	}
</style>
