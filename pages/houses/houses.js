import request from '@/common/request.js'
/**
 * 获取二手房列表
 * @param {Object} data
 * @auther zby
 * @date 2020年5月15日
 * 
 */
export function getHouses(data){
	return request.globalRequest("/apiv1/house/viewHouses","POST",data,1); 
  }