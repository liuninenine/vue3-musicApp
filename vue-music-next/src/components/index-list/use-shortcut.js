import { ref, computed } from 'vue'

export default function useShortcut(props, groupRef) {
  // 锚点高度
  const ANCHOR_HEIGHT = 18
  const scrollRef = ref(null)

  const shortcutList = computed(() => {
    return props.data.map((group) => {
      return group.title
    })
  })

  const touch = {}

  function onShortcutTouchStart(e) {
    // 拿到索引
    const anchorIndex = parseInt(e.target.dataset.index)
    // 纵坐标
    touch.y1 = e.touches[0].pageY
    touch.anchorIndex = anchorIndex
    // 滚动
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove(e) {
    touch.y2 = e.touches[0].pageY
    // 偏移量
    const delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0
    // 目标索引
    const anchorIndex = touch.anchorIndex + delta
    // 滚动
    scrollTo(anchorIndex)
  }
  // 相同逻辑部分，实现滚动的方法
  function scrollTo(index) {
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    const targetEl = groupRef.value.children[index]
    const scroll = scrollRef.value.scroll
    scroll.scrollToElement(targetEl, 0)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
