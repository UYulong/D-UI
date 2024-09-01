import { withInstall } from "@d-ui/utils/vue/install";
import VirtualList from "./src/virtual-list";

export const DTree = withInstall(VirtualList)

export default VirtualList

declare module 'vue' {
  export interface GlobalComponents {
    DVirtualList: typeof VirtualList
  }
}
