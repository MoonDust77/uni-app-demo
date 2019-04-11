<template>
	<view>
		<view class="author-info-box flex">
			<avatarImg :headPicUrl="author.authorPic" :avatarHeight="140"></avatarImg>
			<view class="author-info">
				<view class="author-name">
					<text>{{author.authorName}}</text>
				</view>
				<view class="author-authentication">
					<text>{{author.authenticationInfo}}</text>
				</view>
			</view>
		</view>
		<view class="title">
			<text>文章</text>
		</view>
		<view class="list-box" v-if="articles.length > 0">
			<view class="list-item" v-for="(article, index) in articles" :key="index" @click="goDetailPage(article.articleID)">
				<articleAbstract :headerPicUrls="article.headerPicUrls" :content="article.content"></articleAbstract>
				<articleFooter :browseCount="article.browseCount"></articleFooter>
			</view>
		</view>
	</view>
</template>

<script>
	import {commonApi, host} from '@/api'
	import avatarImg from '@/components/avatar-img'
	import articleAbstract from '@/components/article-abstract'
	import articleFooter from '@/components/article-footer'
	export default {
		components: {avatarImg, articleAbstract, articleFooter},
		data() {
			return {
				authorID: '',
				author: {},
				articles: []
			}
		},
		onLoad(options) {
			this.authorID = options.authorID
			this.fetchData()
		},
		methods: {
			fetchData() {
				let params = {
					authorID: this.authorID,
					customerID: -1,
					pageNum: 1,
					pageSize: 20
				}
				commonApi.getAuthorDetail(params).then(res => {
					if (res.errorCode === 0) {
						this.author = res.data.author
						this.articles = res.data.articles
						uni.setNavigationBarTitle({
							title: this.author.authorName
						})
					} else {
						console.error(res.description)
						uni.showToast({
							title: res.description + 'code:' + res.errorCode
						})
					}
				}, () => {
				  uni.showToast({
				  	title: '数据加载失败'
				  })
				})
			}
		}
	}
</script>

<style>
	.author-info-box {
		align-items: center;
		background: #FFFFFF;
		height: 200upx;
		padding: 0 30upx;
	}
	.author-info {
		margin-left: 24upx;
		padding: 18px 0;
	}
	.author-name {
		font-size: 36upx;
	}
	.author-authentication {
		font-size: 28upx;
		color: #999999;
		margin-top: 12upx;
	}
	.title {
		height: 97upx;
		box-sizing: border-box;
		background: #FFFFFF;
		font-size: 32upx;
		padding: 32upx 30upx 0;
	}
	.list-item {
		padding: 20upx 30upx;
		background: #FFFFFF;
		margin-bottom: 20upx;
	}
</style>
