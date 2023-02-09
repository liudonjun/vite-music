import httpRequest from '../utils/axios'

/**
 * get
 * @param url
 * @param params
 * @returns
 */
const getAction = (url: string, params: object = {}) =>
  httpRequest({
    url,
    method: 'GET',
    params
  })
/**
 * post
 * @param url
 * @param data
 * @returns
 */
const postAction = (url: string, data: object = {}) =>
  httpRequest({
    url,
    method: 'POST',
    data
  })

export { getAction, postAction }
