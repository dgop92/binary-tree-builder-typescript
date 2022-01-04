import "normalize.css";
import "node-snackbar/dist/snackbar.min.css";
import MicroModal from "micromodal";
import { InfiniteCanvasDrawEvent } from "ef-infinite-canvas/dist/types/custom-events/infinite-canvas-draw-event";
import { loadTreeFromQuery } from "./core/importTree";
import { BinaryTree, TreeMutator } from "./core/binaryTree";
import { BasicTreeDrawer } from "./core/renderTree";
import { getLinkToShare, HTML5Form } from "./utils/helpers";
import { BinCanvasListener } from "./core/commonTypes";
import {
  getBinArrayRepresentation,
  getManualRepresentation,
} from "./core/binAlgos";
// bug with infinite Canvas, cannot use ES6 import
// import { InfiniteCanvas } from "ef-infinite-canvas";
const InfiniteCanvas = require("ef-infinite-canvas");

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const infiniteCanvas = new InfiniteCanvas(canvas);
const canvasContext = infiniteCanvas.getContext();
const transformationOffSet = {
  x: 0,
  y: 0,
};

const binForm = new HTML5Form(
  document.getElementById("add-node-form") as HTMLFormElement,
  ".input-container input"
);

const { nodes: initialNodes, currentMaxLevel } = loadTreeFromQuery();
const binaryTree = new BinaryTree(initialNodes, currentMaxLevel);
const treeDrawer = new BasicTreeDrawer(binaryTree, canvasContext);
const treeMutator: BinCanvasListener = new TreeMutator(
  binaryTree,
  binForm,
  treeDrawer
);

function onClickCanvas(event: MouseEvent) {
  const x = event.clientX + transformationOffSet.x;
  const y = event.clientY + transformationOffSet.y;

  for (const treeNode of binaryTree.nodes) {
    if (treeNode === null) continue;

    const isInside = treeNode.isInside(x, y);
    if (isInside) {
      treeMutator.onUpdateNode(treeNode);
      break;
    }

    const isInsideLeft = treeNode.isInsideLeftButton(x, y);
    const isInsideRight = treeNode.isInsideRightButton(x, y);

    if (isInsideLeft || isInsideRight) {
      treeMutator.onAddNode(treeNode, isInsideLeft);
      break;
    }
  }
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  treeDrawer.draw();
}

window.addEventListener("resize", resizeCanvas, false);
canvas.addEventListener("click", onClickCanvas, false);
infiniteCanvas.addEventListener("draw", (e: InfiniteCanvasDrawEvent) => {
  transformationOffSet.x = e.transformation.e;
  transformationOffSet.y = e.transformation.f;
});
resizeCanvas();

MicroModal.init({
  onShow: (modal) => {
    if (modal?.id == "generate-modal") {
      const binArray = getBinArrayRepresentation(binaryTree.nodes);
      const manualRepr = getManualRepresentation(binaryTree.nodes);

      document.getElementById("link-to-share")!.innerHTML =
        getLinkToShare(binArray);
      document.getElementById(
        "bin-arry-preview"
      )!.innerHTML = `[${binArray.toString()}]`;
      document.getElementById("manual-preview")!.innerHTML = manualRepr;
    }
  },
});
