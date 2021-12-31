import { TreeNode } from "./treeNode";

export interface BinCanvasListener {
  onAddNode: (treeNode: TreeNode, isLeft: boolean) => void;
  onUpdateNode: (treeNode: TreeNode) => void;
}

export interface TreeDrawer {
  draw: () => void;
}
