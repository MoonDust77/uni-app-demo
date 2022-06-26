<template>
	<view class="page">
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
			<view :id="item.categoryID" class="scroll-view-item_H" :class="{'active': index === currentIndex}" v-for="(item, index) in list" :key="item.categoryID" @click="clickCategory(index)">{{item.categoryName}}</view>
		</scroll-view>
		<swiper class="swiper" :current="currentIndex" @change="handleChangeSwiper">
			<swiper-item v-for="item in list" :key="item.categoryID">
				<view class="swiper-item">
					<view class="ad-box" v-if="item.articleList && item.articleList.banners && item.articleList.banners.length > 0">
						<swiper :indicator-dots="true" :autoplay="true">
							<swiper-item v-for="(banner, index) in item.articleList.banners" :key="index">
								<view class="ad-image-wrapper">
									<image class="ad-image" mode="scaleToFill" :src="host.imgHost + banner.picUrl"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
					<view class="list-box" v-if="item.articleList && item.articleList.articles && item.articleList.articles.length > 0">
						<view class="list-item" v-for="(article, index) in item.articleList.articles" :key="index" @click="goDetailPage(article.article.articleID)">
							<avatar :author="article.author"></avatar>
							<articleAbstract :headerPicUrls="article.article.headerPicUrls" :content="article.article.content"></articleAbstract>
							<articleFooter :browseCount="article.article.browseCount"></articleFooter>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
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
				currentIndex: 0,
				currentId: '0',
				list: [],
				scrollTop: 0,
				host: host,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad() {
			this.fetchData()
		},
		methods: {
			scroll: function(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			handleChangeSwiper(e) {
				this.currentIndex = e.detail.current
				this.currentId = this.list[e.detail.current].categoryID
				this.fetchContentData()
			},
			fetchData() {
				commonApi.getCategory().then(res => {
					if (res.errorCode === 0) {
						if (res.data && res.data.length > 0) {
							this.currentId = res.data[0].categoryID
							this.list = res.data
							this.fetchContentData()
						}
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
				let list = this.list
				let index = 0
				let loadedFlag = true
				for (let i = 0; i < list.length; i++) {
					if (list[i].categoryID === this.currentId && list[i].articleList) {
						break
					} else if (list[i].categoryID === this.currentId){
						index = i
						loadedFlag = false
						break
					}
				}
				// 已经加载过就不需要再加载了
				if (loadedFlag) return
				let params = {
					'categoryID': this.currentId,
    			'customerID': -1,
    			'pageNum': 1,
    			'pageSize': 20
				}
				commonApi.getList(params).then(res => {
					if (res.errorCode === 0) {
						this.$set(list[index], 'articleList', res.data)
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
			clickCategory(index) {
				this.currentIndex = index
				this.currentId = this.list[index].categoryID
				this.fetchContentData()
			},
			goDetailPage(articleID) {
				uni.navigateTo({
					url: `/pages/article/detail/detail?articleID=${articleID}&categoryID=${this.currentId}`
				})
			}
		}
	}
</script>

<style>
	.page {
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.swiper-item {
		height: 100%;
		overflow: auto;
	}
	.scroll-view_H {
		/* position: fixed; */
		left: 0;
		white-space: nowrap;
		width: 100%;
		background: #fff;
		height: 80upx;
		/* z-index: 2;
		background: #FFFFFF; */
	}
	.scroll-view-item_H {
		display: inline-block;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 28upx;
		color: #888;
	}
	.scroll-view-item_H:first-child{
		margin-left: 40upx;
	}
	.scroll-view-item_H:last-child {
		margin-right: 40upx;
	}
	.scroll-view-item_H + .scroll-view-item_H {
		margin-left: 48upx;
	}
	.scroll-view-item_H.active {
		position: relative;
		font-size: 34upx;
		color: #333;
	}
	.scroll-view-item_H.active:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		height: 4upx;
		width: 80%;
		margin-left: -40%;
		box-sizing: border-box;
		background: #008C3D;
	}
	.swiper {
		width: 100%;
		flex: 1;
	}
	.main-section {
		margin-top: 80upx;
	}
	.ad-image-wrapper {
		height: 280upx;
		width: 100%;
	}
	.ad-image {
		height: 100%;
		width: 100%;
	}
	.ad-box {
		margin-bottom: 20upx;
	}
	.list-item {
		padding: 0 30upx;
		background: #FFFFFF;
		margin-bottom: 20upx;
	}
	
</style>