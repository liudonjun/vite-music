import { defineStore } from 'pinia'
// import { PLAY_MODE } from '@/util/common.ts'

const mainStore = defineStore('main', {
  state: () => {
    return {
      hsaDownLoad: false,
      sequenceList: [],
      playlist: [],
      playing: false,
      // playMode: PLAY_MODE.sequence,
      currentIndex: 0,
      fullScreen: false,
      favoriteList: [],
      searchHistory: [],
      playHistory: []
    }
  },
  getters: {},
  actions: {}
})

export { mainStore }
