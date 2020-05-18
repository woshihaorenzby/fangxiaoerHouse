import request from '@/common/request.js'
/**
 * 获取二手房广告列表
 * @param {Object} data
 * @auther zby
 * @date 2020年5月15日
 * 
 */
export function getAd(data){
	return request.globalRequest("/apiv1/house/viewHotSubRank","POST",data,1); 
  }
  /**
   * 
   * 获取搜索结果
   * @param {Object} data
   * @auther zby
   * @date 2020年5月15日
   * 
   */
 export function  getData(data){
	 return request.globalRequest("/apiv1/base/new_searchIndex","POST",data,1); 
  }