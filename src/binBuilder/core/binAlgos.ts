import { TreeNode } from "./treeNode";

export const treeOperations = {
  left: (i: number) => i * 2 + 1,
  right: (i: number) => i * 2 + 2,
  parent: (i: number) => Math.floor((i - 1) / 2),
};

function getInverseLevel(level: number, currentMaxLevel: number) {
  return currentMaxLevel - level + 1;
}

function getSeparationUnit(inverseLevel: number) {
  return inverseLevel <= 2 ? 0 : Math.pow(2, inverseLevel - 2) - 1;
}

export function getSeparationDelta(level: number, currentMaxLevel: number) {
  const inverseLevel = getInverseLevel(level, currentMaxLevel);
  const separationUnit = getSeparationUnit(inverseLevel);
  return separationUnit * 70 + 80;
}

export function getParentNode(
  i: number,
  nodes: (TreeNode | null)[]
): TreeNode | null {
  const parentIndex = treeOperations.parent(i);
  return nodes[parentIndex];
}

export function getManualRepresentation(nodes: TreeNode[]) {
  let result = "";

  function preOrder(i: number, word: string) {
    result += `${word} = Node(${nodes[i].value})\n`;

    const leftIndex = treeOperations.left(i);
    if (leftIndex < nodes.length && nodes[leftIndex] !== null) {
      preOrder(leftIndex, word + ".left");
    }
    const rightIndex = treeOperations.right(i);
    if (rightIndex < nodes.length && nodes[rightIndex] !== null) {
      preOrder(rightIndex, word + ".right");
    }
  }

  preOrder(0, "root");
  return result.trim();
}

export function createNewNode(
  parentNode: TreeNode,
  value: string,
  currentMaxLevel: number,
  isLeft: boolean
) {
  const newLevel = parentNode.level + 1;

  const sign = isLeft ? -1 : 1;
  const child = isLeft
    ? treeOperations.left(parentNode.i)
    : treeOperations.right(parentNode.i);
  const separation = getSeparationDelta(parentNode.level, currentMaxLevel);

  return new TreeNode(child, newLevel, value, {
    x: parentNode.position.x + separation * sign,
    y: parentNode.position.y + separation,
  });
}
