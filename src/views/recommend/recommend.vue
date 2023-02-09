<template>
  <div class="recommend" v-loading="loading">
    <Scroll class="recommend-content">
      <div>
        <div class="slider-wrapper" v-if="sliders.length">
          <div class="slider-content">
            <slider :sliders="sliders"></slider>
          </div>
        </div>
        <div class="recommend-list">
          <div class="listBox" v-show="!loading">
            <h1 class="list-title">推荐歌单</h1>
            <div class="btnOption">
              <div
                class="itembtn"
                v-for="item in topBtnOption"
                @click="topBtnChecked(item.flag)"
                :key="item.id"
                :class="isLoading === item.flag ? 'active' : ''"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <ul>
            <li
              v-show="isLoading"
              v-for="item in albums"
              class="item"
              :key="item.id"
              @click="selectAlbumItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic" />
                <span>{{ filterNumber(item.count_play) }}</span>
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.name }}
                </h2>
                <p class="title">{{ item.artist_name }}</p>
              </div>
            </li>
            <li
              v-show="!isLoading"
              v-for="item in hosts"
              class="item"
              :key="item.id"
              @click="selectAlbumItem(item)"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.pic" />
                <span>{{ filterNumber(item.count_play) }}</span>
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.name }}
                </h2>
                <p class="title">{{ item.artist_name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
    <router-view :style="viewStyle" v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectSingerData" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeMount, ref, computed } from 'vue'
import { getBanner, getplayList, getplayList2 } from '../../api/api'
import { bannerItem, albumsItem } from './types'
import { filterNumber } from '../../utils/util'
import useViewStyle from '../../hooks/useViewStyle'
import Slider from '@comp/base/slider/slider.vue'
import Scroll from '@comp/base/scroll/scroll.vue'
import { useRouter } from 'vue-router'
const topBtnOption = [
  {
    id: 'tuijian',
    flag: true,
    name: '推荐'
  },
  {
    key: 'hot',
    flag: false,
    name: '热门'
  }
]
const router = useRouter()

const isLoading = ref(false)
const viewStyle = useViewStyle()

// 点击item获得
const selectSingerData = ref(null)
const loading = ref(true)
const sliders = ref([] as Array<bannerItem>)
const albums = ref([] as Array<albumsItem>)
const hosts = ref([] as Array<albumsItem>)

// 页面初始化
onBeforeMount(async () => {
  const p1: Promise<any> = getBanner()
  const p2: Promise<any> = getplayList()
  const p3: Promise<any> = getplayList2()
  Promise.all([p1, p2, p3]).then(([res1, res2, res3]) => {
    loading.value = false
    if (res1.success) {
      const { data } = res1
      sliders.value = data
    }
    if (res2.success) {
      const { data } = res2
      albums.value = data.prettyList
    }
    if (res3.success) {
      const { data } = res3
      console.log(data.prettyList)
      hosts.value = data.prettyList
    }
  })
})

// 歌单类型切换事件
const topBtnChecked = (flag: boolean) => {
  isLoading.value = flag
}

// 歌单点击事件
const selectAlbumItem = (item: any) => {
  selectSingerData.value = item
  cacheAlbum(item)
  router.push(`/recommend/${item.id}`)
}

// 轮播图歌单点击事件
const selectBanner = (item: any) => {
  selectSingerData.value = item
  cacheAlbum(item)
  router.push(`/recommend/${item.id}`)
}

// 歌单缓存事件 数据持久化
const cacheAlbum = (item: any) => {
  sessionStorage.setItem('__album__', JSON.stringify(item))
}
</script>
<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: scroll;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .recommend-list {
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
          position: relative;
          span {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.3);
            bottom: 3px;
            left: -3px;
            font-size: 12px;
            display: inline-block;
            transform: scale(0.9);
          }
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
        }
        .name {
          margin-bottom: 10px;
          color: $color-text;
        }
        .title {
          color: $color-text-d;
        }
      }

      .listBox {
        justify-content: space-between;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .list-title {
          height: 65px;
          line-height: 62px;
          text-align: left;
          padding-left: 20px;
          font-size: $font-size-medium-x;
          color: $color-theme;
        }
        .btnOption {
          width: 80px;
          display: flex;
          color: $color-text;
          justify-content: space-between;
          background: $color-highlight-background;
          border-radius: 3.6vw;
        }
        .itembtn {
          padding: 5px;
          font-size: $font-size-medium-x;
          white-space: nowrap;
          border-radius: 3.6vw;
          transition: 0.2s all ease;
        }
      }
      .active {
        color: $color-theme;
        background: $color-background-d;
      }
    }
  }
}
.recommend::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
