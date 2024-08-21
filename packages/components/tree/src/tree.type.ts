import { ExtractPropTypes, InjectionKey, PropType, SetupContext } from "vue"

export type Key = string | number

export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf: boolean
  disabled: boolean
  [key: string]: unknown
}

export interface TreeNode extends TreeOption {
  level: number
  rawNode: TreeOption,
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },

  labelField: {
    type: String,
    default: 'label'
  },

  keyField: {
    type: String,
    default: 'key'
  },

  childrenField: {
    type: String,
    default: 'children'
  },

  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },

  emptyText: {
    type: String
  },

  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,

  selectedKeys: {
    type: Array as PropType<Key[]>
  },

  selectable: {
    type: Boolean,
    default: true
  },

  multiple: {
    type: Boolean,
    default: false
  }
} as const

export const treeEmits = {
  'update:selected-keys': (keys: Key[]) => keys
}

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expanded: {
    type: Boolean,
    required: true
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>,
    required: true
  },
  selectedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  }
} as const

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node
}

export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>

export interface TreeContext {
  slots: SetupContext['slots']
}
export const treeInjectKey: InjectionKey<TreeContext> = Symbol()

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
}
