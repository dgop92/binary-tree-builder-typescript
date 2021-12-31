import { InfiniteCanvasRenderingContext2D } from "ef-infinite-canvas/dist/types/infinite-context/infinite-canvas-rendering-context-2d";
import { getParentNode, getSeparationDelta } from "./binAlgos";
import { BinaryTree } from "./binaryTree";
import { TreeDrawer } from "./commonTypes";
import { TreeNode } from "./treeNode";

export class BasicTreeDrawer implements TreeDrawer {
  binaryTree: BinaryTree;
  canvasContext: InfiniteCanvasRenderingContext2D;

  constructor(
    binaryTree: BinaryTree,
    canvasContext: InfiniteCanvasRenderingContext2D
  ) {
    this.binaryTree = binaryTree;
    this.canvasContext = canvasContext;
  }

  drawNode(treeNode: TreeNode) {
    const { x, y } = treeNode.position;

    this.canvasContext.lineWidth = 3;
    this.canvasContext.beginPath();
    this.canvasContext.arc(x, y, treeNode.RADIUS, 0, Math.PI * 2, true);
    this.canvasContext.stroke();

    // c.fillStyle = "#D5F5E3"
    // c.strokeStyle = "#D5F5E3"

    this.canvasContext.beginPath();
    this.canvasContext.arc(
      x - treeNode.RADIUS,
      y + treeNode.RADIUS,
      treeNode.ADD_RADIUS,
      0,
      Math.PI * 2,
      true
    );
    this.canvasContext.stroke();
    // c.fill()

    this.canvasContext.beginPath();
    this.canvasContext.arc(
      x + treeNode.RADIUS,
      y + treeNode.RADIUS,
      treeNode.ADD_RADIUS,
      0,
      Math.PI * 2,
      true
    );
    this.canvasContext.stroke();
    // c.fill()

    this.canvasContext.font = "16px Tahoma";
    this.canvasContext.fillStyle = "black";
    this.canvasContext.textAlign = "center";
    this.canvasContext.fillText(treeNode.value, x, y + 4);
  }

  updateNodePosition(treeNode: TreeNode) {
    const parentNode = getParentNode(treeNode.i, this.binaryTree.nodes);

    if (parentNode) {
      const sign = treeNode.i % 2 == 0 ? 1 : -1;
      const separation = getSeparationDelta(
        parentNode.level,
        this.binaryTree.currentMaxLevel
      );
      const position = {
        x: parentNode.position.x + separation * sign,
        y: parentNode.position.y + separation,
      };

      treeNode.position = position;
    }
  }

  drawLine(treeNode: TreeNode) {
    const parentNode = getParentNode(treeNode.i, this.binaryTree.nodes);
    if (parentNode) {
      const parentPosition = parentNode.position;
      const sign = treeNode.i % 2 == 0 ? 1 : -1;
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(
        parentPosition.x + sign * treeNode.RADIUS + sign * treeNode.ADD_RADIUS,
        parentPosition.y + treeNode.RADIUS + treeNode.ADD_RADIUS
      );
      this.canvasContext.lineTo(
        treeNode.position.x - sign * treeNode.RADIUS,
        treeNode.position.y - treeNode.RADIUS
      );
      this.canvasContext.stroke();
    }
  }

  draw() {
    this.canvasContext.clearRect(-Infinity, -Infinity, Infinity, Infinity);

    for (const treeNode of this.binaryTree.nodes) {
      if (treeNode) {
        this.updateNodePosition(treeNode);
        this.drawNode(treeNode);
        this.drawLine(treeNode);
      }
    }
  }
}
