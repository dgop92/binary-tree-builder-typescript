import "normalize.css";
import MicroModal from "micromodal";
import { InfiniteCanvasDrawEvent } from "ef-infinite-canvas/dist/types/custom-events/infinite-canvas-draw-event";
import { loadTreeFromQuery } from "./core/importTree";
import { BinaryTree } from "./core/binaryTree";
import { TreeDrawer } from "./core/renderTree";
/* import { treeOperations, updateNodePosition } from "./core/binAlgos";
import { HTML5Form } from "./utils/utils"; */
// bug with infinite Canvas, cannot use ES6 import
// import { InfiniteCanvas } from "ef-infinite-canvas";
const InfiniteCanvas = require("ef-infinite-canvas");

/* const addNodeForm = new HTML5Form(
  document.getElementById("add-node-form") as HTMLFormElement,
  ".input-container input"
);
 */

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const infiniteCanvas = new InfiniteCanvas(canvas);
const canvasContext = infiniteCanvas.getContext();
const transformationOffSet = {
  x: 0,
  y: 0,
};

const { nodes, currentMaxLevel } = loadTreeFromQuery();
const binaryTree = new BinaryTree(nodes, currentMaxLevel);
const treeDrawer = new TreeDrawer(binaryTree.nodes, canvasContext);

function onClickCanvas(event: UIEvent) {}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(binaryTree.currentMaxLevel);
  treeDrawer.draw(binaryTree.currentMaxLevel);
}

window.addEventListener("resize", resizeCanvas, false);
canvas.addEventListener("click", onClickCanvas, false);
infiniteCanvas.addEventListener("draw", (e: InfiniteCanvasDrawEvent) => {
  transformationOffSet.x = e.transformation.e;
  transformationOffSet.y = e.transformation.f;
});
resizeCanvas();

MicroModal.init();
