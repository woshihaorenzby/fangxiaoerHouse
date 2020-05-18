<script>
	import Vue from 'vue'
	
	export default {
		props: {
		    // 定义一个导航url属性，如果有这个属性就使用这个跳转url
		    url: {
		        type: String,
		        default: ''
		    },
			isBack: {
				type: [Boolean, String],
				default: false
			},
		},
		onLaunch: function() {
			uni.getSystemInfo({
			        success: function(e) {
			            // #ifndef MP
			            Vue.prototype.StatusBar = e.statusBarHeight;
			            if (e.platform == 'android') {
			                Vue.prototype.CustomBar = e.statusBarHeight + 50;
			            } else {
			                Vue.prototype.CustomBar = e.statusBarHeight + 45;
			            };
			            // #endif
			
			            // #ifdef MP
			            Vue.prototype.StatusBar = e.statusBarHeight;
			            let custom = wx.getMenuButtonBoundingClientRect();
			            Vue.prototype.Custom = custom;
			            Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			            // #endif
			        }
			    })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
	
</script>

<style>
	/*每个页面公共css */
	    @import "colorui/main.css";
	    @import "colorui/icon.css";
		@import "main.css";
		
</style>
