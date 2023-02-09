import { computed } from 'vue'
import { mainStore } from '../store/index'
const store = mainStore()

const playlist = computed(() => store.playlist)
const viewStyle = computed(() => {
  const bottom = playlist.value.length ? '60px' : '0'
  return {
    bottom
  }
})

const useViewStyle = () => {
  viewStyle
}

export default useViewStyle
