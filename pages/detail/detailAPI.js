import request from '@/common/request.js'

/**
 * 获取二手房详情页
 * @param {Object} params
 * @auther zby
 * @date 2020年5月13日
 */
export function getDetail(params){
	return request.globalRequest("/apiv1/house/viewHouseDetail","POST",params,1); 
}