// import "normalize.css";
import MicroModal from "micromodal";
import { loadTreeFromQuery } from "./importTree";
import { treeOperations, updateNodePosition } from "./binAlgos";
// bug with infinite Canvas, cannot use ES6 import
const InfiniteCanvas = require("ef-infinite-canvas");
// import { InfiniteCanvas } from "ef-infinite-canvas";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const infiniteCanvas = new InfiniteCanvas(canvas);
const canvasContext = infiniteCanvas.getContext();

const { nodes, maxLevel } = loadTreeFromQuery();

function draw() {
  canvasContext.clearRect(-Infinity, -Infinity, Infinity, Infinity);

  for (const treeNode of nodes) {
    if (treeNode) {
      updateNodePosition(treeNode, nodes, maxLevel);
      treeNode.draw(canvasContext);
      treeNode.drawLine(
        canvasContext,
        nodes[treeOperations.parent(treeNode.i)]
      );
    }
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
}

window.addEventListener("resize", resizeCanvas, false);
resizeCanvas();

MicroModal.init();
