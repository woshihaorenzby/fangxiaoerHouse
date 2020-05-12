import request from '@/common/request.js'

/**
 * 获取二手房列表
 * @param {Object} params
 * @auther zby
 * @date 2020年5月12日
 */
export function getList(params){
	return request.globalRequest("/apiv1/house/viewHouses","POST",params,1); 
}