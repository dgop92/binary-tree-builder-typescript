import MicroModal from "micromodal";
import { LEVEL_THRESHOLD } from "../utils/constant";
import { HTML5Form } from "../utils/helpers";
import { showErrorMessage } from "../utils/snacks";
import { createNewNode } from "./binAlgos";
import { BinCanvasListener, TreeDrawer } from "./commonTypes";
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
    if (newNode.level > this.currentMaxLevel) {
      this.currentMaxLevel = newNode.level;
    }

    return {
      error: false,
      errorMessage: "",
    };
  }

  editNode(node: TreeNode, value: string) {
    node.value = value;
  }
}

export class TreeMutator implements BinCanvasListener {
  binaryTree: BinaryTree;
  form: HTML5Form;
  treeDrawer: TreeDrawer;

  constructor(binaryTree: BinaryTree, form: HTML5Form, treeDrawer: TreeDrawer) {
    this.binaryTree = binaryTree;
    this.form = form;
    this.treeDrawer = treeDrawer;
  }

  openAddModal() {
    MicroModal.show("modal-add-node");
    document.getElementById("add-node-input-id")!.focus();
  }

  onAddNode(treeNode: TreeNode, isLeft: boolean) {
    this.openAddModal();
    this.form.onSuccesForm = (data) => {
      const value = data["value"];
      const result = this.binaryTree.addNode(treeNode, value, isLeft);
      if (result.error) {
        showErrorMessage({ text: result.errorMessage, duration: 7000 });
      }
      MicroModal.close("modal-add-node");
      this.treeDrawer.draw();
    };
  }
  onUpdateNode(treeNode: TreeNode) {
    this.openAddModal();
    (document.getElementById("add-node-input-id")! as HTMLInputElement).value =
      treeNode.value;
    this.form.onSuccesForm = (data) => {
      const value = data["value"];
      this.binaryTree.editNode(treeNode, value);
      MicroModal.close("modal-add-node");
      this.treeDrawer.draw();
    };
  }
}

// instead of throwing an error, just replace the node

/* if (this.nodes[newNode.i] == null) {

      this.nodes[newNode.i] = newNode;
      this.currentMaxLevel = newNode.level;
    }
    else {
      
      return {
        error: true,
        errorMessage: "",
      };
    } */
