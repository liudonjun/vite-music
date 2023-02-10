<template>
  <div class="search">
    <div class="search-input-wrapper">
      <SearchInput v-model="query" />
      <!-- <input type="text" v-model="query" /> -->
    </div>
    <scroll ref="scrollRef" class="search-content" v-show="!query">
      <div>
        <div class="hot-keys">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" v-for="item in hotKeys" :key="item.id" @click="addQuery(item.key)">
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <!-- 搜索历史事件派发保存Pinia中 待处理 TODO  -->
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <confirm
            ref="confirmRef"
            text="是否清空所有搜索历史"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          >
          </confirm>
          <search-list
            :searches="searchHistory"
            @select="addQuery"
            @delete="deleteSearch"
          ></search-list>
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest :query="query" @select-song="selectSong" @select-singer="selectSinger"></suggest>
    </div>

    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :singer="selectedSinger" />
      </transition>
    </router-view>
  </div>
  <message ref="messageRef">
    <div class="message-title">
      <i class="icon-ok"></i>
      <span class="text">{{ msg }}</span>
    </div>
  </message>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, nextTick, computed } from 'vue'
import SearchInput from '@comp/search/search-input.vue'
import Confirm from '@/components/base/confirm/confirm.vue'
import Message from '@/components/base/message/message.vue'
import { mainStore } from '../../store/index'
import suggest from '@comp/search/suggest.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import SearchList from '@/components/base/search-list/search-list.vue'
import { getHotSearch, getLyric, getSongUrl } from '@/api/api.ts'
import useSearchHistory from '@/components/search/use-search-history'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = mainStore()
const query = ref('')
const messageRef = ref(null)
const msg = ref('')
const hotKeys = ref([])
const selectedSinger = ref(null)
const scrollRef = ref(null)
const confirmRef = ref(null)

const searchHistory = computed(() => store.searchHistory)
const hsaDownLoad = computed(() => store.hsaDownLoad)

const { saveSearch, deleteSearch, clearSearch } = useSearchHistory()

onBeforeMount(() => {
  getHotSearch().then((res: any) => {
    console.log(res)
    hotKeys.value = res.data
  })
})

function showMessage() {
  messageRef.value.show()
}

watch(query, async (newQuery) => {
  if (newQuery == '奥力给' && !hsaDownLoad.value) {
    store.setDownLoad(true)
    msg.value = '成功解锁隐藏下载模式！'
    showMessage()
    console.log(666)
  }
  if (!newQuery) {
    await nextTick()
    refreshScroll()
  }
})

function showConfirm() {
  confirmRef.value.show()
}

function addQuery(s: any) {
  query.value = s
}

function refreshScroll() {
  scrollRef.value.scroll.refresh()
}

async function selectSong(song: any) {
  await getSongUrl(song.id).then((res: any) => {
    song['url'] = res.data.url
  })
  await getLyric(song.id).then((res: any) => {
    song['pic'] = res.data.info.album_pic
    song['lyric'] = res.data.lrc
  })
  await nextTick()
  saveSearch(query.value)
  store.addSong(song)
}

function selectSinger(singer: any) {
  console.log(singer)
  saveSearch(query.value)
  selectedSinger.value = singer
  cacheSinger(singer)

  router.push({
    path: `/search/${singer.id}`
  })
}

function cacheSinger(singer) {
  sessionStorage.setItem('__singer__', JSON.stringify(singer))
}
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .search-input-wrapper {
    margin: 20px;
  }
  .search-content {
    flex: 1;
    overflow: hidden;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-medium;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }
  .search-result {
    flex: 1;
    overflow: hidden;
  }
}
.message-title {
  text-align: center;
  padding: 18px 0;
  font-size: 0;
  .icon-ok {
    font-size: $font-size-medium;
    color: $color-theme;
    margin-right: 4px;
  }
  .text {
    font-size: $font-size-medium;
    color: $color-text;
  }
}
</style>
