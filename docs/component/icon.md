# Icon 图标

d-ui 推荐使用 xicons 作为图标库

```
$ pnpm i @vicons/ionicons5
```

## 使用图标

- 如果您想像用例一样直接使用，你需要全局注册，才能够直接在项目里使用

<script setup lang="ts">
import { Alarm, AirplaneOutline } from '@vicons/ionicons5'
</script>

<DIcon color="red" size="80">
  <AirplaneOutline />
</DIcon>

<d-icon color="red" size="80">
  <Alarm />
</d-icon>

```vue
<script setup lang="ts">
import { Alarm, AirplaneOutline } from '@vicons/ionicons5'
</script>

<template>
  <d-icon color="red" size="80">
    <Alarm />
  </d-icon>

  <DIcon color="red" size="80">
    <AirplaneOutline />
  </DIcon>
</template>
```

## API

### icon props

| 名称  |     类型      |  默认值   |   说明   |
| ----- | :-----------: | :-------: | :------: |
| color |    string     | undefined | 图标颜色 |
| size  | number/string | undefined | 图标大小 |
