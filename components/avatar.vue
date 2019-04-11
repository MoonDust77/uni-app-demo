<template>
	<view class="avatar-wrapper flex" :style="{'height': height + 'upx'}" @click.stop="goAuthor">
		<avatarImg :headPicUrl="author.authorPic" :avatarHeight="avatarHeight"></avatarImg>
		<text class="author-name">{{author.authorName}}</text>
	</view>
</template>

<script>
	import avatarImg from '@/components/avatar-img'
	export default {
		components: {avatarImg},
		props: {
			author: {
				type: Object,
				default: function() {
					return {}
				}
			},
			height: {
				type: Number,
				default: 100
			},
			avatarHeight: {
				type: Number,
				default: 52
			},
			authorID: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			goAuthor() {
				uni.navigateTo({
					url: `/pages/article/author/author?authorID=${this.author.authorID}`
				})
			}
		}
	}
</script>

<style>
	.avatar-wrapper {
		align-items: center;
	}
	.author-name {
		color: #666;
		margin-left: 16upx;
		font-size: 24upx;
		line-height: 100upx;
	}
</style>
