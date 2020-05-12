

<template>
	<view class="content">
		<image @click="hehe" class="logo" src="/static/logo.png"></image>
		<view v-for="(item,i) in list" class="text-area">
			<text  class="title">{{title}}</text>
			<text>
				{{item.IntermediaryName}}
			</text>
		</view>
	</view>
</template>

<script>
	import {getList} from "./indexAPI.js"
	
	export default {
		data() {
			return {
				title: 'Hello',
				list:[]
			}
		},
		onLoad() {

		},
		created(){
			this.heihei();
		},
		methods: {
			hehe(){
				console.log("我是好人")
				this.heihei()
			},
			heihei(){
				getList().then(res=>{
					this.list = res.content
					console.log(res)
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
