<template>
	<view>
		<view class="top-header">
			<cu-custom :isBack="true" :url="lastURL"></cu-custom>
			<view class="searchDiv">
				<image class="searchImg" src="/static/search.png" alt=""></image>
				<input id="search" class="search" placeholder="请输入小区名称或地址" :value="search"></input>
				<text class="clear" v-if="search!==null&&search!=undefined &&search!==''"></text>
				<text></text>
				<navigator url="../search/search">
					<view class="returns">
						<text></text>
						<a class="search_btn">取消</a>
					</view>
				</navigator>
			</view>
		</view>
		<view class="filter">
			<view class="filter-item">
				<view v-for="(item,i) in buttonFilter" class="padding flex flex-row justify-between align-center bg-white">
					<button class="cu-btn round">{{item.name}}
						<view class="cu-item">
							<text class="lg text-gray cuIcon-unfold"></text>
						</view>
					</button>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav " scroll-with-animation :scroll-left="scrollLeft">
				<view class="filter-item">
					<view v-for="(item,i) in buttonFilter2" class="padding flex flex-wrap justify-between align-center bg-white">
						<button class="cu-btn round sm">{{item.name}}</button>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 二手房列表 -->
		<view class="house-list">
			<view v-if="houses!==null&&houses.length>0" v-for="(item,i) in houses"  :data-id="item.houseId"  @click="goToDetail">
				<view class="house-item">
					<view>
						<image :src="item.pic"></image>
					</view>
					<view class="details-show">
						<text class="title ">{{item.title}}</text>
						<text class="region detail-item-column">{{item.regionName+" "+item.subName}}</text>
						<view class="price-layout-size-forward detail-item-column">
							<text class="price ">{{item.price+"万元"}}</text>
							<text class="layout detail-item-row">{{item.layout}}</text>
							<text class="size detail-item-row">{{item.area+"㎡"}}</text>
							<text class="forward detail-item-row">{{item.forward}}</text>
						</view>
						<view class="houseTrait detail-item-column" v-if="item.houseTrait!==null&&item.houseTrait!=undefined&&item.houseTrait!==''">
							<text class="houseTrait-item " :class="index===0?'':'detail-item-row'" v-for="(ht,index) in item.houseTrait.split(',')">{{ht}}</text>
						</view>
					</view>
				</view>
				<view class="house-item-footer"></view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getHouses
	} from "./houses.js"
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				search: "",
				lastURL: "",
				houses: [],
				buttonFilter: [{
					"name": "区域",
					"dataId": "area"
				}, {
					"name": "售价",
					"dataId": "price"
				}, {
					"name": "户型",
					"dataId": "rooms"
				}, {
					"name": "更多",
					"dataId": "mores"
				}],
				buttonFilter2: [{
					"name": "视频看房",
					"dataId": "video"
				}, {
					"name": "进地铁",
					"dataId": "nearSubWay"
				}, {
					"name": "户型通透",
					"dataId": "roomsInOut"
				}, {
					"name": "精装房",
					"dataId": "mores"
				}]
			}
		},
		onLoad: function(option) {
			this.search = option.search
			this.lastURL = "../search/search"
			let params = {}
			if (this.search && this.search != undefined) {
				params.search = this.search
			}
			this.getHouses(params)
		},
		methods: {
			getHouses(params) {
				getHouses(params).then(res => {
					this.houses = res.content
					console.log(this.houses)
				});
			},
			goToDetail(e){
				let houseId = e.currentTarget.dataset.id
				console.log(houseId)
				let url = "../detail/detail?id="+houseId
				uni.navigateTo({"url":url})
			}
		}
	}
</script>

<style>
	.top-header {
		display: flex;
		flex-direction: row;
	}

	/*  #ifdef  H5  */
	.searchDiv {
		width: 600rpx;
		margin-top: 16rpx;
	}

	/*  #endif  */
	/*  #ifdef  MP-WEIXIN  */
	.searchDiv {
		width: 713rpx;
		margin-top: 120rpx;
	}

	/*  #endif  */
	.searchDiv .clear {
		/*  #ifdef  MP-WEIXIN  */
		margin-left: 547rpx;
		/*  #endif  */
		/*  #ifdef  H5  */
		margin-left: 436rpx;
		/*  #endif  */
	}

	.filter {
		display: flex;
		flex-direction: column;
	}

	.filter-item {
		display: flex;
		flex-direction: row;
	}

	.cu-btn {
		font-size: 24rpx;
		color: #333333;
		font-family: "F ZL TH JW";
		text-align: center;
		min-width: 135rpx;
	}

	.padding {
		padding: 13px;
	}

	.house-item {
		width: 750rpx;
		height: 274rpx;
		display: flex;
		flex-direction: row;
		padding: 20rpx 40rpx 0 0;
		margin-left: 22rpx;
	}

	.house-item image {
		height: 192rpx;
		width: 230rpx;
		border-bottom: 2rpx #e8e8e8 solid;
	}

	.details-show {
		display: flex;
		flex-direction: column;
		margin-left: 40rpx;
	}

	.detail-item-column {
		margin-top: 20rpx;
	}

	.title {
		font-size: 30rpx;
		letter-spacing: 0rpx;
		line-height: 44rpx;
		color: #000000;
		font-family: "Microsoft Ya Hei";
		font-weight: bold;
	}

	.region {
		font-size: 22rpx;
		color: #545454;
		font-family: "F ZL TH JW";
	}

	.price {
		font-size: 32rpx;
		color: #FF4231;
		font-family: '微软雅黑 Bold', '微软雅黑';
		text-align: right;
		font-weight: bold;
	}

	.detail-item-row {
		margin-left: 18rpx;
	}

	.houseTrait-item {
		width: 64rpx;
		height: 32rpx;
		background: inherit;
		background-color: rgba(255, 105, 3, 0.0980392156862745);
		border: none;
		border-radius: 4rpx;
		-moz-box-shadow: none;
		-webkit-box-shadow: none;
		box-shadow: none;
		font-family: '微软雅黑 Regular', '微软雅黑';
		font-weight: 400;
		font-style: normal;
		font-size: 18rpx;
		color: #FF6903;
	}

	.house-item-footer {
		height: 20rpx;
		width: 345px;
		height: 1px;
		background-color: #e8e8e8;
		margin: 32rpx 28rpx 28rpx 28rpx;
	}
</style>
