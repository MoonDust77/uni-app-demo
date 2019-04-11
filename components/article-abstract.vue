<template>
	<view class="content">
		<swiper v-if="headerPicUrls.length > 1" :style="{'height': imageHeight + 'upx'}">
			<swiper-item v-for="(picUrl, picIndex) in headerPicUrls" :key="picIndex">
				<image class="content-img" :src="host.imgHost + picUrl" mode="widthFix" :style="{'height': imageHeight + 'upx'}"></image>
			</swiper-item>
		</swiper>
		<image class="content-img" :src="host.imgHost + headerPicUrls[0]" mode="widthFix" v-else></image>
		<view class="content-text">
			<text>{{content}}</text>
		</view>
	</view>
</template>

<script>
	import {host} from '@/api'
	export default {
		props: {
			headerPicUrls: {
				type: [Array],
        default: function () {
					return []
				}
			},
			content: {
				type: String,
				default: ''
			},
			imageHeight: {
				type: Number
			},
			contentBoxHeight: {
				type: Number
			}
		},
		data() {
			return {
				host: host
			}
		}
	}
</script>

<style>
	.content-img {
		width: 100%;
	}
	.content-text {
		font-size: 28upx;
		line-height: 40upx;
		display: -webkit-box;    
		-webkit-box-orient: vertical;    
		-webkit-line-clamp: 2;    
		overflow: hidden;
	}
</style>
