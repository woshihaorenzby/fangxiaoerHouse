<template>
	<view class="fixTop">
		<!-- #ifdef MP-WEIXIN -->
		<view class="header"></view>
		<!-- #endif -->
		<view class="m_top m_nav">
			<a class="return" onclick="javascript:history.back(-1);"></a>
		</view>
		<view class="searchDiv">
			<image class="searchImg" src="/static/search.png" alt=""></image>
			<input id="search" @input="searchInfo" @confirm="enterList" class="search" :placeholder="placeholer" :value="search"></input>
			<text class="clear" v-if="clearShow" @click="doClear"></text>
			<text></text>
			<navigator url="/pages/index/index">
				<view class="returns">
					<text></text>
					<a class="search_btn" >取消</a>
				</view>
			</navigator>
		</view>
		<!--热搜-->
		<view class="content">
			<view class="switch">
				<view class="com" v-if="adList!==null&&adList!==undefined && adList.length>0">
					<view class="comHot">
						<view class="hotDiv">
							<h1>热门搜索</h1>
							<view class="over overS">
								<!-- th:onclick="'javascript:goUrl(1,\''+${one.subName}+'\',\'/fang2/search='+${one.subName} +'\')'" -->
								<a v-for="(val,index) in adList"  v-if="index<8">
									<text>{{val.subName}}</text>
								</a>
							</view>
						</view>
						<view class="hisDiv">
						</view>
					</view>
				</view>
			</view>
			<view class="com result" v-if="searchList!=null&&searchList!=undefined &&searchList.length>0">
				<view class="circle" v-for="(item,index) in searchList" >
					<navigator :url="getUrl(item)">
						<view class="title">
							<view>
								<text v-for="(val,index) in item.title"  :class="val.highLight?'high':'nomarl'">{{val.value}}</text>
								<text class="labelType">{{item.type!=null&&item.type!=''?item.type:item.category}}</text>
							</view>

						</view>
						<view class="cirAdr" v-if="item.address!=null&&item.address!=undefined&&item.address.length>0">
							<view>
								<text v-for="(val,index) in item.address" :class="val.highLight?'high':''">{{val.value}}</text>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {getAd,getData} from "./searchAPI.js"
	export default {
		data() {
			return {
				placeholer: '请输入小区名或地址',
				adList: [],
				history: [],
				searchList: [],
				clearShow: false,
				search: ''
			}
		},
		onLoad:function(option){
			this.search = option.search 
			this.getAd();
			this.getHistory();
		},
		methods: {
			/**
			  * 获取广告
			  */
			 getAd(){
			   getAd().then(res=>{
				  this.adList=res.content
			   });
			 },
			 /**
			  * 搜索信息
			  * 
			  * @param {*} e 
			  */
			 searchInfo(e){
				 this.search=e.detail.value.trim()
				 this.doSearch()
			 },
			 doSearch(e){
			   if(this.search){
			     let searchData = {
			       "search":this.search,
			       "page":0,
			       "pageSize":20,
			       "key":2
			     }
			     getData(searchData).then(res=>{
					 this.adList=[]
			       console.log(res);
			       if(res.content){
			         res.content.forEach(item=>{
			           if(item.address!=undefined&&item.address!=null){
			             item.address = this.getHighLight(item.address);
			           }        
			           item.title = this.getHighLight(item.title);   
					   item.titleStr = this.arr2Str(item.title);
			         });
					 this.searchList = res.content
					 this.clearShow = true
			       }
			     });
			   }else{
			    this.doClear();
			   }
			 },
			enterList(e){
				this.search=e.detail.value.trim()
				if(this.search){
					uni.redirectTo({
						url: "../houses/houses?search="+this.search
					})
				}
			},
			 getHighLight(str){
			   let result=[];
			   if(str!=null&&str.length>0){
			     let first= str.split("<i>");
			     let i = 0;
			     first.forEach(f=>{
			       if(f.indexOf("</i>")>0){
			         let second = f.split("</i>");
			         result.push({"value":second[0],"highLight":true});
			         result.push({"value":second[1],"highLight":false});
			       }else{
			         if(f!=null&&f!=''){
			           result.push({"value":f,"highLight":false});
			         }          
			       }
			     });
			   }
			   return result;
			 },
			 arr2Str(arr){
				 let str  = ""
				 arr.forEach(item=>{
					 str +=item.value
				 });
				 return str
			 },
			 doClear(){
				 this.adList = this.getAd()
				 this.history = this.getHistory()
				 this.searchList = []
				 this.clearShow = false
				 this.search = ''
			 },
			 /**
			  * 搜索的历史记录
			  */
			 getHistory(){
			 },
			 getUrl(item){
				 return "../houses/houses?id="+item.tableId+"&search="+item.titleStr
			 }
		}
		 
	}
</script>

<style>
	.header{
		height: 100rpx;
	}
	
	.comHot h1 {
		font-size: 31.875rpx;
		color: #000;
		font-weight: bold;
		margin-top: 0.5rem;
		margin-bottom: 0.4rem;
	}

	.content {
		/*  #ifdef  MP-WEIXIN  */
		height: 1066rpx;
		/*  #endif  */
		/*  #ifdef  H5  */
		height: 1200rpx;
		/*  #endif  */
		padding: 0 33.75rpx;
		overflow-y: scroll;
		margin-top: 36rpx;
	}

	.hotDiv {
		height: 260rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.comHot text {
		font-size: 24rpx;
		color: #545454;
		display: inline-flex;
		height: 55rpx;
		line-height: 55rpx;
		padding: 0 22.5rpx;
		background: #eeededd8;
		height: 62rpx;
		border-radius: 64rpx;
		align-items: center;
		justify-content: center;
	}
	.searchDiv .clear {
		margin-left: 514rpx;
	}
	.over {
		display: block;
		margin-top: 32rpx;
	}

	.over a {
		overflow: hidden;
		font-size: 48rpx;
		font-family: "微软雅黑";
		display: inline-block;
		margin-right: 22rpx;
		margin-bottom: 10rpx;
	}

	.cirAdr {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		margin-top: 21rpx;
	}

	.cirAdr view {
		display: inline;
	}

	.cirAdr text {
		white-space: nowrap;
		display: inline;
		text-overflow: ellipsis;
		font-size: 26rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		line-height: 12rpx;
		color: rgba(145, 148, 150, 1);
	}

	.cirAdr .high {
		color: rgba(75, 120, 184, 1);
	}

	.title .high {
		color: rgba(75, 120, 184, 1);
	}

	.title .nomarl {
		height: 30rpx;
		font-size: 30rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 12rpx;
	}

	.circle {
		overflow: hidden;
		padding: 32.25rpx 0;
		border-bottom: 2rpx solid #eeeeee;

	}

	.labelType {
		font-size: 22rpx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: rgba(66, 69, 71, 1);
		height: 30rpx;
		padding: 0 5.25rpx;
		background: #eeededd8;
		border-radius: 2rpx;
		margin-left: 18rpx;
	}
</style>
