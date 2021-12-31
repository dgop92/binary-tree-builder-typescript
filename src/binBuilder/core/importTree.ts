import { createNewNode, treeOperations } from "./binAlgos";
import { TreeNode } from "./treeNode";
import { MAX_NODES } from "../utils/constant";

function getEmptyNodes(): TreeNode[] {
  return Array(MAX_NODES).fill(null);
}

function addDefaultRootNode(nodes: TreeNode[]) {
  nodes[0] = new TreeNode(0, 1, "1", {
    x: Math.floor(window.innerWidth / 2),
    y: 100,
  });
}

function getRawTreeAsArray(indextreeQuery: string | null) {
  let treeAsArray: string[] | null = null;

  if (indextreeQuery !== null) {
    if (indextreeQuery.length === 0) {
      throw new Error("indextree cannot be empty");
    }

    treeAsArray = indextreeQuery.split(",");

    if (treeAsArray.length > MAX_NODES) {
      throw new Error(`The maximum number of nodes allowed is ${MAX_NODES}`);
    }
  }

  return treeAsArray;
}

/* TODO: replace alert() by snackbar */
export function loadTreeFromQuery() {
  const params = new URLSearchParams(window.location.search);
  // indextree= is not undefined, it returns ""
  const indextreeQuery = params.get("indextree") ?? null;

  let currentMaxLevel = 1;
  const nodes = getEmptyNodes();
  addDefaultRootNode(nodes);

  let treeAsArray: string[] | null = null;
  try {
    treeAsArray = getRawTreeAsArray(indextreeQuery);
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
    return { nodes, currentMaxLevel };
  }

  if (treeAsArray === null) {
    return { nodes, currentMaxLevel };
  }

  // an unexpected error is an invalid binary tree
  try {
    // treeAsArray will alwasy contains at least one element thanks
    // to above validations

    const rootValue = treeAsArray.shift()!;

    for (let index = 0; index < treeAsArray.length; index++) {
      const value = treeAsArray[index];
      const binIndex = index + 1;
      if (value !== "null") {
        const parentIndex = treeOperations.parent(binIndex);
        const isLeft = binIndex % 2 !== 0;
        const newNode = createNewNode(
          nodes[parentIndex],
          value,
          currentMaxLevel,
          isLeft
        );
        if (newNode.level > currentMaxLevel) {
          currentMaxLevel = newNode.level;
        }
        nodes[newNode.i] = newNode;
      }
    }

    nodes[0] = new TreeNode(0, 1, rootValue, {
      x: Math.floor(window.innerWidth / 2),
      y: 100,
    });
  } catch (error) {
    alert("invalid binary tree array representation");
  }

  return { nodes, currentMaxLevel };
}
