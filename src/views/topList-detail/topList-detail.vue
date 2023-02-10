<template>
  <div class="singer-detail">
    <music-list
      :songs="detailData"
      :title="title"
      :pic="pic"
      rank
      :loading="loading"
      :request-data="searchMore"
    ></music-list>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { getTopListDetail } from '@/api/api.ts'
import { useRoute } from 'vue-router'
import router from '../../router'
import MusicList from '@comp/music-list/music-list.vue'

const route = useRoute()

const detailData = ref([])

// 是否还有更多
const hasMore = ref(true)
// 初始页码
const page = ref(1)
// 每页条数
const pageSize = ref(20)
// 总条数
const total = ref(0)

const loading = ref(true)
const props = defineProps({
  singer: {
    type: Object,
    default() {
      return {}
    }
  }
})

const computedSinger = computed(() => {
  let ret = null
  const singerData = props.singer

  if (singerData && singerData.value) {
    ret = singerData
  } else {
    let obj: any = sessionStorage.getItem('__top__')
    const cachedSinger = JSON.parse(obj)
    if (cachedSinger && cachedSinger.sourceid == route.params.id) {
      ret = cachedSinger
    }
  }

  return ret
})

const title = computed(() => {
  const singerData = computedSinger.value
  return singerData && singerData.name
})
const pic = computed(() => {
  const singerData = computedSinger.value
  return singerData && singerData.pic
})

// 获取初始数据
const searchFirst = async () => {
  getTopListDetail(computedSinger.value.sourceid, 1, pageSize.value).then((res: any) => {
    loading.value = false
    detailData.value = res.data.data.list
  })
}

const onPullUp = (bool: boolean) => {
  console.log('onPullUp', bool)
}

// 下拉加载更多
async function searchMore() {
  if (!hasMore.value) {
    return
  }
  page.value++
  const res = await getTopListDetail(computedSinger.value.sourceid, page.value, pageSize.value)
  detailData.value = detailData.value.concat(res.data.data.list)
  total.value = res.data.data.total
  // await nextTick()
  // await makeItScrollable()
}

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
