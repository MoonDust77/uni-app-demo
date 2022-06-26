<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" class="swiper">
			<swiper-item v-for="(headerPicUrl, index) in article.headerPicUrls" :key="index">
				<image class="ad-image" mode="widthFix" :src="host.imgHost + headerPicUrl"></image>
			</swiper-item>
		</swiper>
		<view class="main-section">
			<view class="article-title-box">
				<text>{{article.articleTitle}}</text>
			</view>
			<avatar :author="author" v-if="author.authorPic"></avatar>
			<view class="content-box"></view>
			<articleFooter :browseCount="article.browseCount" :showLike="false"></articleFooter>
		</view>
		<view class="main-section pb-16">
			<view class="main-section-title">
				<text>更多内容</text>
			</view>
			<view class="list-col-2 flex" v-if="moreArticleList.length > 0">
				<view class="list-item" v-for="article in moreArticleList" :key="article.article.articleID" @click="goDetailPage(article.article.articleID)">
					<articleAbstract :headerPicUrls="article.article.headerPicUrls" :content="article.article.content" :imageHeight="164"></articleAbstract>
					<view class="footer-wrapper">
						<avatar :author="article.author" v-if="article.author.authorPic" :height="74" :avatarHeight="34"></avatar>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {commonApi, host} from '@/api'
	import avatar from '@/components/avatar'
	import articleAbstract from '@/components/article-abstract'
	import articleFooter from '@/components/article-footer'
	export default {
		components: {avatar, articleAbstract, articleFooter},
		data() {
			return {
				host: host,
				articleID: '',
				categoryID: '',
				article: {},
				author: {},
				moreArticleList: []
			}
		},
		onLoad(options) {
			this.articleID = options.articleID
			this.categoryID = options.categoryID
			this.fetchData()
			this.fetchContentData()
		},
		methods: {
			fetchData() {
				commonApi.getArticleDetail(this.articleID).then(res => {
					if (res.errorCode === 0) {
						this.article = res.data.article
						this.author = res.data.author
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
			},
			fetchContentData() {
				let params = {
					'categoryID': this.categoryID,
    			'customerID': -1,
    			'pageNum': 1,
    			'pageSize': 4
				}
				commonApi.getList(params).then(res => {
					if (res.errorCode === 0) {
						this.moreArticleList = res.data.articles
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
			},
			goDetailPage(articleID) {
				uni.navigateTo({
					url: `/pages/article/detail/detail?articleID=${articleID}&categoryID=${this.categoryID}`
				})
			}
		}
	}
</script>

<style>
	.swiper {
		height: 370upx;
	}
	.ad-image {
		width: 100%;
	}
	.main-section {
		padding: 30upx 30upx 0;
		background: #FFFFFF;
	}
	.article-title-box {
		font-size: 36upx;
	}
	.main-section + .main-section {
		margin-top: 20upx;
	}
	.main-section-title {
		font-size: 32upx;
		margin-bottom: 28upx;
	}
	.pb-16 {
		padding-bottom: 16upx;
	}
	.list-col-2 {
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.footer-wrapper {
		padding: 0 12upx;
	}
	.list-item {
		width: 332upx;
		max-height: 330upx;
		border-radius: 20upx;
		box-shadow:0px 4px 12px 0px rgba(0,0,0,0.08);
		margin-bottom: 24upx;
	}
</style>
