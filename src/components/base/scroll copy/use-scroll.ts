import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'

BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef: any, options: object | any, emit: Function) {
  const scroll: any = ref(null)
  const isPullUpLoad = ref(false)

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      pullUpLoad: true,
      ...options
    }))

    if (options.probeType > 0) {
      scrollVal.on('scroll', (pos: object) => {
        emit('scroll', pos)
      })
    }

    scrollVal.on('pullingUp', pullingUpHandler)

    async function pullingUpHandler() {
      if (options.preventPullUpLoad.value) {
        scrollVal.finishPullUp()
        return
      }
      isPullUpLoad.value = true
      emit('pullingUp', true)
      await options.requestData()
      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullUpLoad.value = false
      emit('pullingUp', false)
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  return {
    isPullUpLoad,
    scroll
  }
}
