import { defineComponent, inject, toRef } from 'vue'
import { treeInjectKey, treeNodeContentProps } from './tree.type'

export default defineComponent({
  name: 'DTreeNodeContent',

  props: treeNodeContentProps,

  setup(props) {
    const treeContext = inject(treeInjectKey)
    const node = toRef(props, 'node')

    return () => {
      return treeContext?.slots.default
        ? treeContext?.slots.default({ node: node.value })
        : node.value?.label
    }
  }
})
