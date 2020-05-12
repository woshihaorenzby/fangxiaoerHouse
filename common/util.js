/**
 * 拼接对象为请求字符串
 * 对于需要编码的文本（比如说中文）我们要进行编码
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 **/
export function formatGetUri(params) {
	let result = {}
  Object.keys(params).forEach(key=> {
    let value = params[key]
    if (typeof value !== 'undefined' || value !== null) {
      result.push([key, encodeURIComponent(value)].join('='))
    }
  })
  return '?' + result.join('&')
}