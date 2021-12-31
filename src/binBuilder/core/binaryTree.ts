import { LEVEL_THRESHOLD } from "../utils/constant";
import { createNewNode } from "./binAlgos";
import { TreeNode } from "./treeNode";

export class BinaryTree {
  readonly nodes: (TreeNode | null)[];
  currentMaxLevel: number;

  constructor(nodes: (TreeNode | null)[], currentMaxLevel: number) {
    this.currentMaxLevel = currentMaxLevel;
    this.nodes = nodes;
  }

  addNode(parentNode: TreeNode, value: string, isLeftButtonClick: boolean) {
    const newNode = createNewNode(
      parentNode,
      value,
      this.currentMaxLevel,
      isLeftButtonClick
    );

    if (newNode.level == LEVEL_THRESHOLD) {
      return {
        error: true,
        errorMessage: "You cannot keep adding new levels to the tree",
      };
    }

    this.nodes[newNode.i] = newNode;
    this.currentMaxLevel = newNode.level;

    return {
      error: false,
      errorMessage: "You cannot keep adding new levels to the tree",
    };
  }

  editNode(node: TreeNode, value: string) {
    node.value = value;
  }
}
