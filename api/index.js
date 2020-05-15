import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'

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
api.register = params => request.globalRequest(`${PORT1}/mobile/signUp${formatGetUri(params)}`, 'GET //必须大写，为了兼容其他应用',{}, 1)
api.goHome =params=> uni.navigateTo({
	"url": "/pages/index/index"
})
api.goBack =params=> uni.navigateBack()
export default api