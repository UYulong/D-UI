<template>
  <div
    :class="[
      ns.b('node'),
      ns.is('selected', isSelected),
      ns.is('disabled', node.disabled)
    ]"
  >
    <div
      :class="[ns.be('node', 'content')]"
      :style="{ paddingLeft: `${node.level * 16}px` }"
    >
      <span
        :class="[
          ns.be('node', 'expand-icon'),
          ns.is('leaf', node.isLeaf),
          { expanded: expanded && !node.isLeaf }
        ]"
        @click.stop="handleExpandIconClick"
      >
        <d-icon>
          <LoadingIcon v-if="isLoaind" />
          <CaretForward v-else />
        </d-icon>
      </span>

      <span @click="handleSelected">
        <TreeNodeContent :node="node" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNameSpace } from '@d-ui/hooks'
import { treeNodeEmits, treeNodeProps } from './tree.type'
import { DIcon } from '@d-ui/components/icon'
import CaretForward from './icon/CaretForward'
import LoadingIcon from './icon/loading'
import TreeNodeContent from './tree-node-content'

defineOptions({
  name: 'DTreeNode'
})

const props = defineProps(treeNodeProps)

const ns = useNameSpace('tree')

const emits = defineEmits(treeNodeEmits)

// 点击图标
const handleExpandIconClick = () => {
  emits('toggle', props.node)
}

// 是否正在加载中
const isLoaind = computed(() => {
  return props.loadingKeys.has(props.node.key!)
})

// 是否选中
const isSelected = computed(() => {
  return props.selectedKeys.includes(props.node.key!)
})

const handleSelected = () => {
  if (!props.node.disabled) return
  emits('select', props.node)
}
</script>

<style lang="scss" scoped></style>
