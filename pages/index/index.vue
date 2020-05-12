

<template>
	<view class="content">
		<image @click="click" class="logo" src="/static/logo.png"></image>
		<view v-for="(item,i) in list" class="text-area"   >
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
		},
		methods: {
			click(){
				if(this.list.length>0){
					this.list=[]
				}else{
					this.getList()
				}
			},
			getList(params){
				getList(params).then(res=>{
					this.list = res.content
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
