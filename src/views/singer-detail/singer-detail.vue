<template>
  <div class="singer-detail" ref="rootRef">
    <music-list
      :songs="detailData"
      :title="title"
      :pic="pic"
      :loading="loading"
      :request-data="searchMore"
      @onPullUp="onPullUp"
    ></music-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { getSingerDetail } from '@/api/api.ts'
import { useRoute } from 'vue-router'
import router from '../../router'
import MusicList from '@comp/music-list/music-list.vue'
import usePullUpLoad from '../../components/search/use-pull-up-load'

const route = useRoute()
// 是否还有更多
const hasMore = ref(true)
// 初始页码
const page = ref(1)
// 每页条数
const pageSize = ref(20)
// 总条数
const total = ref(0)
// 数据源
const detailData = ref([])
// 页面初始化加载状态
const loading = ref(true)
// 手动加载状态
const manualLoading = ref(false)
// props 歌手对象
const props = defineProps({
  singer: {
    type: Object,
    default() {
      return {}
    }
  }
})

// 根据地址栏id读取缓存歌手对象信息
const computedSinger = computed(() => {
  let ret = null
  const singerData = props.singer

  if (singerData && singerData.value) {
    ret = singerData
  } else {
    let obj: any = sessionStorage.getItem('__singer__')
    const cachedSinger = JSON.parse(obj)
    if (cachedSinger && cachedSinger.id == route.params.id) {
      ret = cachedSinger
    }
  }

  return ret
})

// 歌手名称
const title = computed(() => {
  const singerData = computedSinger.value
  return singerData && singerData.name
})
// 歌手图片
const pic = computed(() => {
  const singerData = computedSinger.value
  return singerData && singerData.pic
})

const getData = async () => {
  await console.log('getData')
}

const preventPullUpLoad = computed(() => {
  return loading.value || manualLoading.value
})

const onScrollPos = (pos) => {
  console.log(pos)
}

const onPullUp = (bool:boolean) => {
  console.log('onPullUp', bool)
}

const { isPullUpLoad, rootRef, scroll } = usePullUpLoad(searchMore, preventPullUpLoad)

// 获取初始数据
const searchFirst = async () => {
  const res = await getSingerDetail(computedSinger.value.id, 1, pageSize.value)
  loading.value = false
  detailData.value = res.data.data.list
}
// 下拉加载更多
async function searchMore() {
  if (!hasMore.value) {
    return
  }
  page.value++
  const res = await getSingerDetail(computedSinger.value.id, page.value, pageSize.value)
  detailData.value = detailData.value.concat(res.data.data.list)
  total.value = res.data.data.total
  // await nextTick()
  // await makeItScrollable()
}

// 页面挂在完成时调用
onMounted(() => {
  if (!computedSinger.value) {
    const path = route.matched[0].path
    router.push({
      path: path
    })
    return
  }
  searchFirst()
})
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
