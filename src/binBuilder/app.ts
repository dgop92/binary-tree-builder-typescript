import "normalize.css";
import MicroModal from "micromodal";
import { loadTreeFromQuery } from "./importTree";
import { treeOperations, updateNodePosition } from "./binAlgos";
import { HTML5Form } from "./utils";
// bug with infinite Canvas, cannot use ES6 import
// import { InfiniteCanvas } from "ef-infinite-canvas";
const InfiniteCanvas = require("ef-infinite-canvas");

const addNodeForm = new HTML5Form(
  document.getElementById("add-node-form") as HTMLFormElement,
  ".input-container input"
);

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
