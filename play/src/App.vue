<template>
  <DIcon color="red" size="80">
    <Alarm />
  </DIcon>

  <DIcon color="red" size="80">
    <AirplaneOutline />
  </DIcon>

  <!-- v-model:selected-keys="selectedKeys"
  :selectable="true"
  :multiple="false"
  @select="handleSelect"
  -->
  <DTree
    label-field="label"
    key-field="key"
    children-field="children"
    :data="data"
    :on-load="handleLoad"
  >
    <template #default="{ node }">
      {{ node.key + '-' + node.label }}
    </template>
  </DTree>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Alarm, AirplaneOutline } from '@vicons/ionicons5'
import { Key, TreeNode, TreeOption } from '@d-ui/components/tree'

function createData(level = 4, baseKey = ''): any {
  if (!level) return []

  const arr = new Array(20 - level).fill(0)

  return arr.map((_, index) => {
    const key = `${baseKey}${level}${index}`
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

function createLazyData() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}

function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}

// const data = ref(createLazyData())
const data = ref(createData())

// 懒加载
const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>(resolve => {
    setTimeout(() => {
      resolve([
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}

// 选择节点
// const selectedKeys = ref<Key[]>(['40', '41'])
const handleSelect = (node: TreeNode) => {}

// 禁用节点
// const createDisableData = () => {
//   return [
//     {
//       key: '0',
//       label: '0',
//       children: [
//         {
//           key: '0-0',
//           label: '0-0'
//         },
//         {
//           disabled: true,
//           key: '0-1',
//           label: '0-1',
//           children: [
//             {
//               label: '0-1-0',
//               key: '0-1-0'
//             },
//             {
//               label: '0-1-1',
//               key: '0-1-1'
//             }
//           ]
//         }
//       ]
//     },
//     {
//       key: '1',
//       label: '1',
//       children: [
//         {
//           key: '1-0',
//           label: '1-0'
//         },
//         {
//           checkboxDisabled: true,
//           key: '1-1',
//           label: '1-1',
//           children: [
//             {
//               label: '1-1-0',
//               key: '1-1-0'
//             },
//             {
//               label: '1-1-1',
//               key: '1-1-1'
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
// const data = ref(createDisableData())
</script>

<style scoped></style>
