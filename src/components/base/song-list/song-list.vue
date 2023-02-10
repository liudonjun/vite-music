<template>
  <ul class="song-list">
    <li class="item" v-for="(song, index) in songs" :key="song.id" @click="selectItem(song, index)">
      <div class="rank" v-if="rank">
        <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
      </div>
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getDesc(song) }}</p>
      </div>
      <div class="downLoad" v-if="hsaDownLoad">
        <span class="icon" @click.stop="showDownLoad(song, index)"></span>
      </div>
    </li>
    <div class="item" v-loading:[loadingText]="pullUpLoading"></div>
  </ul>
  <message ref="messageRef">
    <div class="message-title">
      <i class="icon-ok"></i>
      <span class="text">{{ msg }}</span>
    </div>
  </message>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getSongUrl } from '@/api/api.ts'
import Message from '@/components/base/message/message.vue'
import { mainStore } from '../../../store/index'
defineProps({
  songs: {
    type: Array,
    default() {
      return []
    }
  },
  pullUpLoading: Boolean,
  rank: Boolean
})

const store = mainStore()

const msg = ref('')
const loadingText = ref('正在加载更多。。。')

const messageRef = ref(null)

const hsaDownLoad = computed(() => store.hsaDownLoad)

const emit = defineEmits(['select'])

const getDesc = (song: any) => {
  return `${song.album_name}·${song.artist_name}`
}
const selectItem = (song: any, index: any) => {
  emit('select', song, index)
}

const showDownLoad = async (song: any, index: number) => {
  const res = await getSongUrl(song.id, 2000)
  if (res.success) {
    // 下载文件
    var form = document.createElement('form')
    form.action = res.data.url
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)

    // let a = document.createElement("a");
    // a.download = song.album_name + "-" + song.artist_name;
    // a.href = res.data.url;
    // a.target = "_blank";
    // a.click();
    msg.value = '正在为你调起任务！'
    showMessage()
  } else {
    msg.value = res.data
    showMessage()
  }
}

function showMessage() {
  messageRef.value?.show()
}

const getRankCls = (index: any) => {
  if (index <= 2) {
    return `icon icon${index}`
  } else {
    return 'text'
  }
}
const getRankText = (index: any) => {
  if (index > 2) {
    return index + 1
  }
}
</script>

<style lang="scss" scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .rank {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 20px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        &.icon0 {
          @include bg-image('first');
        }
        &.icon1 {
          @include bg-image('second');
        }
        &.icon2 {
          @include bg-image('third');
        }
      }
      .text {
        color: $color-theme;
        font-size: $font-size-large;
      }
    }
    .downLoad {
      flex: 0 0 25px;
      width: 25px;
      margin-right: 20px;
      text-align: center;
      .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
        background-image: url('./download.svg');
        // &.icon0 {
        //   @include bg-image("first");
        // }
        // &.icon1 {
        //   @include bg-image("second");
        // }
        // &.icon2 {
        //   @include bg-image("third");
        // }
      }
    }
    .content {
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        @include no-wrap();
        color: $color-text;
      }
      .desc {
        @include no-wrap();
        margin-top: 4px;
        color: $color-text-d;
      }
    }
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
