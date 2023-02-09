import { getAction } from './merge'

/**
 * 获取轮播图
 * @returns
 */
const getBanner = () => getAction(`/api/home`)
/**
 * 获取首页歌单列表
 * @returns
 */
const getplayList = () => getAction(`/api/playList1`)
const getplayList2 = () => getAction(`/api/playList2`)

export { getBanner, getplayList,getplayList2 }
