import request from '@/common/request.js'
import {
	formatGetUri
} from '@/common/util.js'


/**
 * 
 * 全局方法
 * 
 */
const api = {}
const PORT1 = '/baseinfo'
// POST请求方式
api.register = params => request.globalRequest(`${PORT1}/mobile/signUp`, 'POST//必须大写，为了兼容其他应用', params, 1)
// GET请求方式
api.register = params => request.globalRequest(`${PORT1}/mobile/signUp${formatGetUri(params)}`, 'GET //必须大写，为了兼容其他应用', {},
	1)
api.goHome = params => uni.navigateTo({
	"url": "/pages/index/index"
})
api.goURL = e => {
	uni.navigateTo({
		"url": e
	})
}
//前一页的onShow方法，把setData的数据赋值到当前页面绑定的变量上
api.onShow = parm => {
	let pages = getCurrentPages();
	let currPage = pages[pages.length - 1];
	if (currPage.data.selectedAddress == undefined || currPage.data.selectedAddress == '') {

	} else {
		this.address = currPage.data.selectedAddress
		this.address_id = currPage.data.selectedAddressID
	}
}
export default api
