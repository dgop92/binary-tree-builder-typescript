import { InfiniteCanvasRenderingContext2D } from "ef-infinite-canvas/dist/types/infinite-context/infinite-canvas-rendering-context-2d";
import { getParentNode, getSeparationDelta } from "./binAlgos";
import { TreeNode } from "./treeNode";

export class TreeDrawer {
  readonly nodes: TreeNode[];
  canvasContext: InfiniteCanvasRenderingContext2D;

  constructor(
    nodes: TreeNode[],
    canvasContext: InfiniteCanvasRenderingContext2D
  ) {
    this.nodes = nodes;
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

  updateNodePosition(treeNode: TreeNode, currentMaxLevel: number) {
    const parentNode = getParentNode(treeNode.i, this.nodes);

    if (parentNode) {
      const sign = treeNode.i % 2 == 0 ? 1 : -1;
      const separation = getSeparationDelta(parentNode.level, currentMaxLevel);
      const position = {
        x: parentNode.position.x + separation * sign,
        y: parentNode.position.y + separation,
      };

      treeNode.position = position;
    }
  }

  drawLine(treeNode: TreeNode) {
    const parentNode = getParentNode(treeNode.i, this.nodes);
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

  draw(currentMaxLevel: number) {
    this.canvasContext.clearRect(-Infinity, -Infinity, Infinity, Infinity);

    for (const treeNode of this.nodes) {
      if (treeNode) {
        this.updateNodePosition(treeNode, currentMaxLevel);
        this.drawNode(treeNode);
        this.drawLine(treeNode);
      }
    }
  }
}
