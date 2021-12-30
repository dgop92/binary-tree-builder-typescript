import { TreeNode } from "./binaryTree";

export const treeOperations = {
  left: (i: number) => i * 2 + 1,
  right: (i: number) => i * 2 + 2,
  parent: (i: number) => Math.floor((i - 1) / 2),
};

function getInverseLevel(level: number, maxLevel: number) {
  return maxLevel - level + 1;
}

function getSeparationUnit(inverseLevel: number) {
  return inverseLevel <= 2 ? 0 : Math.pow(2, inverseLevel - 2) - 1;
}

function getSeparationDelta(level: number, maxLevel: number) {
  const inverseLevel = getInverseLevel(level, maxLevel);
  const separationUnit = getSeparationUnit(inverseLevel);
  return separationUnit * 70 + 80;
}

function getParentNode(i: number, nodes: TreeNode[]) {
  const parentIndex = treeOperations.parent(i);
  return nodes[parentIndex];
}

export function updateNodePosition(
  treeNode: TreeNode,
  nodes: TreeNode[],
  maxLevel: number
) {
  const parentNode = getParentNode(treeNode.i, nodes);

  if (parentNode) {
    const sign = treeNode.i % 2 == 0 ? 1 : -1;
    const separation = getSeparationDelta(parentNode.level, maxLevel);
    const position = {
      x: parentNode.position.x + separation * sign,
      y: parentNode.position.y + separation,
    };

    treeNode.position = position;
  }
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

export function getNewNode(
  parentNode: TreeNode,
  value: string,
  maxLevel: number,
  isLeft: boolean
) {
  const newLevel = parentNode.level + 1;

  const sign = isLeft ? -1 : 1;
  const child = isLeft
    ? treeOperations.left(parentNode.i)
    : treeOperations.right(parentNode.i);
  const separation = getSeparationDelta(parentNode.level, maxLevel);

  return new TreeNode(child, newLevel, value, {
    x: parentNode.position.x + separation * sign,
    y: parentNode.position.y + separation,
  });
}
