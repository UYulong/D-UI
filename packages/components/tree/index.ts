import { withInstall } from "@d-ui/utils/vue/install";
import Tree from "./src/tree.vue";

export const DTree = withInstall(Tree)

export default Tree

export * from './src/tree.type'


declare module 'vue' {
  export interface GlobalComponents {
    DTree: typeof DTree
  }
}
