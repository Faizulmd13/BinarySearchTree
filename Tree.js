import { Node } from "./Node.js";

export class Tree {
  constructor(arr) {
    const sortedArray = sortAndRemoveDuplicates(arr);
    this.root = buildTree(sortedArray, 0, sortedArray.length - 1);
  }
}

function sortAndRemoveDuplicates(arr) {
  const sortedArray = arr.sort((a, b) => a - b);

  let i = 0;
  while (i < sortedArray.length - 1) {
    if (sortedArray[i] === sortedArray[i + 1]) {
      sortedArray.splice(i + 1, 1);
    } else {
      i++;
    }
  }
  return sortedArray;
}

function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }

  const mid = Math.floor((start + end) / 2);
  const root = new Node(arr[mid]);

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}
