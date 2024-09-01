import { useNameSpace } from '@d-ui/hooks'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'DVirtualList',

  props: {
    size: {
      type: Number,
      default: 32
    },

    remain: {
      type: Number,
      default: 8
    },

    items: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { slots }) {
    const ns = useNameSpace('virtual-list')
    const wrapperRef = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()
    const offset = ref(0)

    const state = reactive({
      start: 0,
      end: props.remain
    })

    // 计算外部容器和滚动条的高度
    const initFn = () => {
      wrapperRef.value!.style.height = props.remain * props.size + 'px'
      barRef.value!.style.height = props.items.length * props.size + 'px'
    }

    watch(() => props.items, initFn)

    // 挂载后，计算外部容器和滚动条的高度
    onMounted(() => {
      initFn()
    })

    const prev = computed(() => {
      return Math.min(state.start, props.remain)
    })

    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })

    const visibleData = computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })

    // 监听滚动
    const handleScrollEvent = () => {
      const scrollTop = wrapperRef.value!.scrollTop

      state.start = Math.floor(scrollTop / props.size) // 划过去了多少个
      state.end = state.start + props.remain

      offset.value = state.start * props.size - props.size * prev.value // 滚过去了多少个
    }

    return () => {
      return (
        <div class={ns.b()} ref={wrapperRef} onScroll={handleScrollEvent}>
          <div class={ns.e('scroll-bar')} ref={barRef}></div>
          <div
            class={ns.e('scroll-list')}
            style={{ transform: `translate3d(0, ${offset.value}px, 0)` }}
          >
            {visibleData.value.map(node => slots.default({ node }))}
          </div>
        </div>
      )
    }
  }
})
