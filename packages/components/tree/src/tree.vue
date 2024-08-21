<template>
  <div :class="[ns.b()]">
    <d-tree-node
      v-for="node in flattenTree"
      :key="node.id"
      :node="node"
      :expanded="isExpanded(node)"
      :loading-keys="loadingKeysRef"
      :selected-keys="selectedKeysRef"
      @select="handleSelect"
      @toggle="toggleExpand"
    />

    <!-- 无数据 -->
    <div v-if="isEmpty" :class="ns.e('empty-block')">
      <slot name="empty">
        <span :class="ns.e('empty-text')">
          {{ emptyText ?? '暂无数据' }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, unref, useSlots, watch } from 'vue'
import {
  Key,
  treeEmits,
  treeInjectKey,
  TreeNode,
  TreeOption,
  treeProps
} from './tree.type'
import { useNameSpace } from '@d-ui/hooks'
import DTreeNode from './tree-node.vue'

defineOptions({
  name: 'DTree'
})

const ns = useNameSpace('tree')

const props = defineProps(treeProps)

const tree = ref<TreeNode[]>([])

const createOptions = (key: string, label: string, children: string) => {
  return {
    getKey(node: TreeOption) {
      return node[key] as string
    },

    getLabel(node: TreeOption) {
      return node[label] as string
    },

    getChildren(node: TreeOption) {
      return node[children] as TreeOption[]
    }
  }
}

// 创建 数选项
const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
)

// 根据用户传递的树节点信息，对数据进行清洗
const createTree = (data: TreeOption[], parent: TreeNode | null = null) => {
  const traversal = (data: TreeOption[], parent: TreeNode | null = null) => {
    return data.map(node => {
      const children = treeOptions.getChildren(node) || []
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [], // 默认为空
        rawNode: node,
        level: parent ? parent.level + 1 : 0,
        disabled: node.disabled,
        isLeaf: node.isLeaf ?? children.length === 0
      }

      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode)
      }

      return treeNode
    })
  }

  const result: TreeNode[] = traversal(data, parent)
  return result
}

watch(
  () => props.data,
  (newVal: TreeOption[]) => {
    tree.value = createTree(newVal)
    // console.log('watch tree.value: ', tree.value)
  },
  {
    immediate: true
  }
)

// 需要被展开的树节点
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

// 拍平树结构
const flattenTree = computed(() => {
  const expandedKeys = unref(expandedKeysSet) // 要展开的keys
  const flattenNodes: TreeNode[] = [] // 拍平后的结果
  const nodes = unref(tree) || [] // 被格式化后的节点
  const stack: TreeNode[] = [] // 遍历树的栈

  // [40, 41] => [41, 40]
  for (let i = nodes.length - 1; i >= 0; --i) {
    stack.push(nodes[i])
  }

  while (stack.length) {
    const node = stack.pop() // 取最后一项
    if (!node) continue

    flattenNodes.push(node)
    if (expandedKeys.has(node.key!)) {
      const children = node.children
      if (children) {
        for (let i = children.length - 1; i >= 0; --i) {
          stack.push(children[i] as TreeNode)
        }
      }
    }
  }

  return flattenNodes
})

console.log('flattenTree: ', flattenTree)

// 是否无数据
const isEmpty = computed(() => {
  return props.data.length === 0
})

const loadingKeysRef = ref(new Set<Key>())
// 触发懒加载
const triggerLoading = (node: TreeNode) => {
  // 这个节点需要异步加载
  if (!node.children?.length && !node.isLeaf) {
    // 如果没有加载过这个节点，就异步加载
    const loadingKeys = loadingKeysRef.value
    if (!loadingKeys.has(node.key!)) {
      loadingKeys.add(node.key!)

      const onLoadFn = props.onLoad
      if (onLoadFn) {
        onLoadFn(node.rawNode).then(children => {
          // 修改原来的节点
          node.rawNode.children = children
          // 更新啊自定义的node
          node.children = createTree(children, node)
          loadingKeys.delete(node.key!)
        })
      }
    }
  }
}

// 是否展开
const isExpanded = (node: TreeNode): boolean => {
  return expandedKeysSet.value.has(node.key!)
}

// 折叠
const collapse = (node: TreeNode) => {
  unref(expandedKeysSet).delete(node.key!)
}

// 展开
const expand = (node: TreeNode) => {
  unref(expandedKeysSet).add(node.key!)

  // 懒加载数据
  triggerLoading(node)
}

// 切换折叠 / 展开
const toggleExpand = (node: TreeNode) => {
  if (
    unref(expandedKeysSet).has(node.key!) &&
    !unref(loadingKeysRef).has(node.key!)
  ) {
    collapse(node)
  } else {
    expand(node)
  }
}

// 实现选中节点
const selectedKeysRef = ref<Key[]>([])

watch(
  () => props.selectedKeys,
  newVal => {
    if (newVal) {
      selectedKeysRef.value = newVal
    }
  },
  {
    immediate: true
  }
)

// 处理节点的选中
const emits = defineEmits(treeEmits)
const handleSelect = (node: TreeNode) => {
  let keys = Array.from(unref(selectedKeysRef))

  // 不能选择
  if (!props.selectable) return

  // 多选
  if (props.multiple) {
    const index = keys.findIndex(key => key === node.key)
    if (index > -1) {
      keys.splice(index, 1)
    } else {
      keys.push(node.key!)
    }
  } else {
    // 单选
    if (keys.includes(node.key!)) {
      keys = []
    } else {
      keys.push(node.key!)
    }
  }

  emits('update:selected-keys', keys)
}

provide(treeInjectKey, {
  slots: useSlots()
})
</script>

<style lang="scss" scoped></style>
