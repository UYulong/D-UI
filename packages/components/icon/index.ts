import { withInstall } from "@d-ui/utils/vue/install";
import Icon from "./src/icon.vue";

export const DIcon = withInstall(Icon)

export default Icon

export * from './src/icon'


declare module 'vue' {
  export interface GlobalComponents {
    DIcon: typeof DIcon
  }
}