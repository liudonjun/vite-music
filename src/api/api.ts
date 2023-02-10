import { getAction } from './merge'

/**
 * 获取轮播图
 * @returns
 */
const getBanner = () => getAction(`/api/home`)
/**
 * 获取轮播图歌单详情列表
 * @param id
 * @param pn
 * @param rn
 * @returns
 */
const getBannerPlayList = (id: string, pn: number, rn: number) =>
  getAction(`/api/ablumList?id=${id}&pn=${pn}&rn=${rn}`)
/**
 * 获取首页推荐歌单
 * @returns
 */
const getplayListNew = () => getAction(`/api/playList1`)

/**
 * 获取首页热门歌单
 * @returns
 */
const getplayListHot = () => getAction(`/api/playList2`)

/**
 * 获取歌单详情列表
 * @param id
 * @param pn
 * @param rn
 * @returns
 */
const getplayListDetail = (id: string, pn: number, rn: number) =>
  getAction(`/api/playList?id=${id}&pn=${pn}&rn=${rn}&ua=ip=`)

/**
 * 获取歌手列表
 * @returns
 */
const getSingerList = () => getAction(`/api/singers`)

/**
 * 获取歌手详情列表
 * @param id
 * @param pn
 * @param rn
 * @returns
 */
const getSingerDetail = (id: string, pn: number, rn: number) =>
  getAction(`/api/singerDetailList?id=${id}&pn=${pn}&rn=${rn}`)

// 获取排行榜
const getTopList = () => getAction(`/api/rank`)
// 获取排行版详情列表
const getTopListDetail = (id: number, pn: number, rn: number) =>
  getAction(`/api/rankList?id=${id}&pn=${pn}&rn=${rn}`)

// 获取热门搜索
const getHotSearch = () => getAction(`/api/hotKey`)

// 获取搜索详情列表
const getSearchList = (keyword: number, pn: number) =>
  getAction(`/api/searchList?keyword=${keyword}&pn=${pn}`)
/**
 * 获取歌曲信息
 * @param id
 * @returns
 */
const getLyric = (id: number) => getAction(`/api/lyric?id=${id}`)

/**
 * 获取播放地址
 * level:ff,bitrate:2000,format:flac,size:24.99Mb;
 * level:pp,bitrate:1000,format:ape,size:24.15Mb;
 * level:p,bitrate:320,format:mp3,size:9.8Mb;
 * level:h,bitrate:128,format:mp3,size:3.63Mb;
 * level:s,bitrate:24,format:aac,size:720.91Kb
 * @param id songID
 * @param type bitrate
 * @returns songUrl
 */
const getSongUrl = (id: number, type: number = 128) =>
  getAction(`/api/player?id=${id}&type=${type}`)
export {
  getBanner,
  getplayListNew,
  getplayListHot,
  getBannerPlayList,
  getplayListDetail,
  getSingerList,
  getSingerDetail,
  getLyric,
  getSongUrl,
  getTopList,
  getTopListDetail,
  getHotSearch,
  getSearchList
}
