<template>
	<view>
		<view class="box">
			<view class="cu-bar ">
				<view class="cu-list header ">
					<view class="cu-item">
						<text class="lg text-gray cuIcon-back" @click="$api.goBack"></text>
					</view>
					<view class="cu-item" @click="$api.goHome">
						<text class="lg text-gray cuIcon-homefill"></text>
					</view>
				</view>
				<view class="content text-bold">
					房源详情
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper class="screen-swiper" :circular="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in data.pic" :key="index">
				<image :src="item.url" mode="aspectFill"></image>
				<view class="index-bar-text">
					<text class="index-bar-text-text" >{{index+1}}</text>
					/
					<text class="index-bar-text-text">{{data.pic.length}}</text>
				</view>
			</swiper-item>
		</swiper>
		<!-- 标签 -->
		<view class="houseTrait" v-if="houseTrait!==null&&houseTrait!==''">
			<text v-for="(item,i) in houseTrait">{{item}}</text>
		</view>
		<!-- 标题 -->
		<view class="title">
			<text>{{data.title}}</text>
		</view>
		<!-- 总面积，户型，面积 -->
		<view class="price-rooms-size">
			<view class="second-view total-price">
				<text class="third-view-main total-price-num">{{data.price+"万元"}}</text>
				<text class="third-view-text ">总价</text>
			</view>
			<view class="second-view total-price">
				<text class="third-view-main total-rooms">{{data.layout}}</text>
				<text class="third-view-text ">户型</text>
			</view>
			<view class="second-view total-price">
				<text class="third-view-main total-rooms">{{data.area+"㎡"}}</text>
				<text class="third-view-text ">面积</text>
			</view>
		</view>
		<!-- 详情展示 -->
		<view class="details-show">
			<!-- 单价 -->
			<view class="details-show-box pre-price">
				<view>
					<text class="details-show-title">单价</text>
					<text class="details-show-content">{{data.unitPrice +"元/㎡"}}</text>
				</view>
			</view>
			<view class="details-show-box floor">
				<view>
					<text class="details-show-title">楼层</text>
					<text class="details-show-content">{{data.floorDesc+"(共"+data.totleFloorNumber+"层)"}}</text>
				</view>
			</view>
			<view class="details-show-box forward">
				<view class="flex-row">
					<text class="details-show-title">朝向</text>
					<text class="details-show-content">{{data.forward}}</text>
				</view>
				<view class="flex-row">
					<text class="details-show-title">类型</text>
					<text class="details-show-content">{{data.saleTypeName!==null&&data.saleTypeName!==""&&data.saleTypeName!=="普宅"?data.saleTypeName:"普通住宅"}}</text>
				</view>
			</view>
			<view class="details-show-box renovation-years">
				<view class="flex-row">
					<text class="details-show-title">装修</text>
					<text class="details-show-content">{{data.fitmentTypeName}}</text>
				</view>
				<view class="flex-row">
					<text class="details-show-title">年代</text>
					<text class="details-show-content">{{data.buildDate+"年"}}</text>
				</view>
			</view>
			<view class="details-show-box subName">
				<view>
					<text class="details-show-title">小区</text>
					<text class="details-show-content">{{data.subName+"( "+data.regionName+" "+data.platName+" )"}}</text>
				</view>
			</view>
			<view class="details-show-box subWayInfo" v-if="data.subWayInfo!=null&&data.subWayInfo!=''">
				<view>
					<text class="details-show-title">地铁</text>
					<text class="details-show-content">{{data.subWayInfo}}</text>
				</view>
			</view>
		</view>
		<view class="house-info">
			<text>房源介绍</text>
			<view class="agent-card">
				<!--经纪人头像-->
				<view class="padding">
					<!-- data.keeperPic2 -->
					<view class="cu-avatar round"  :style="[{backgroundImage:'url(' + data.keeperPic2 + ')' }]"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		getDetail
	} from "./detailAPI.js"
	export default {
		data() {
			return {
				id: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				floor: "低层",
				data: {},
				houseTrait:[]
			}
		},
		onLoad: function(option) {
			if (option && option.id) {
				//option为object类型，会序列化上个页面传递的参数
				console.log(option)
				console.log(option.id) //打印出上个页面传递的参数。
				this.getDetail(option.id)
			}
		},
		created() {},
		methods: {
			getDetail(id) {
				let params = {
					"houseId": id
				}
				getDetail(params).then(res => {
					this.data = res.content
					this.houseTrait = (data.houseTrait!==null&&data.houseTrait!==''?data.houseTrait:'急售').split(',')
				})
			}
		}
	}
</script>
<style>
	.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}

	.header {
		display: flex;
	}

	.header .cu-item {
		padding: 20rpx 0rpx 30rpx;
		padding-bottom: calc((100%)/3);
		height: 50%;
		width: calc((100%)/3);
	}

	.houseTrait {
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.houseTrait text {
		display: inline-block;
		padding: 0 6rpx;
		margin: 10rpx 0rpx 10rpx 0;
		border-radius: 6rpx;
		border: 2rpx solid #ddd;
		font-size: 24rpx;
		margin-left: 20rpx;
		margin-top: 40rpx;
	}

	.title {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-size: 44rpx;
		margin: 20rpx 20rpx 0 40rpx;
	}

	.index-bar-text {
		position: absolute;
		bottom: 3%;
		right: 8rpx;
		display: block;
		color: #fff;
		opacity: 1;
		width: 100rpx;
		left: auto;
		background: url(https://static.fangxiaoer.com/m/static/images/house/swiperNumimg.png) no-repeat rgba(0, 0, 0, 0.8) 6px 4px;
		border-radius: 100rpx;
		background-size: 24rpx;
		padding: 4rpx 4rpx 4rpx 30rpx;
		font-size: 24rpx;
		text-align: center;
		-webkit-transition: .3s opacity;
		-o-transition: .3s opacity;
		transition: .3s opacity;
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
		z-index: 10;
	}

	.index-bar-text-text {
		background-color: none !important;
	}

	.price-rooms-size {
		flex-direction: row;
		display: flex;
		margin: 20rpx 40rpx 0 0;
	}

	.second-view {
		border-width: 0rpx;
		margin-top: 15rpx;
		margin-left: 54rpx;
		display: flex;
		flex-direction: column;
	}

	.third-view-main {
		font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
		font-weight: 650;
		font-style: normal;
		font-size: 40rpx;
		color: #FF4231;
		height: 48rpx;
	}

	.third-view-text {
		align-self: center;
		margin-top: 8rpx;
		width: 50rpx;
		height: 28rpx;
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		font-weight: 400;
		font-style: normal;
		font-size: 24rpx;
		color: #999999;
	}

	.details-show {
		display: flex;
		flex-direction: column;
		margin: 10rpx 20rpx 0rpx 40rpx;
	}

	.details-show-box {
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
	}

	.details-show-title {
		border-width: 0rpx;
		width: 58rpx;
		height: 34rpx;
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		font-weight: 400;
		font-style: normal;
		color: #999999;
	}

	.details-show-content {
		margin-left: 20rpx;
		border-width: 0px;
		height: 34rpx;
		font-family: 'PingFangSC-Regular', 'PingFang SC';
		font-weight: 400;
		font-style: normal;
	}

	.flex-row {
		float: right;
		width: calc(45%);
	}

	.house-info {
		margin: 40rpx 0rpx 0rpx 40rpx;
	}

	.house-info text {
		height: 48rpx;
		font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
		font-weight: 650;
		font-style: normal;
		font-size: 40rpx;

	}
	.agent-card{
		background-color: #f2f2f2;
	}
</style>
