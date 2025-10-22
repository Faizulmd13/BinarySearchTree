import { Node } from "./Node.js";

export class Tree {
  constructor(arr) {
    const sortedArray = sortAndRemoveDuplicates(arr);
    this.root = buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  insert(root = this.root, value) {
    if (root === null) {
      return new Node(value);
    }

    if (value < root.data) {
      root.left = this.insert(root.left, value);
    } else if (value > root.data) {
      root.right = this.insert(root.right, value);
    }
    return root;
  }

  delete(root = this.root, value) {
    function findSuccessor(node) {
      let current = node.right;
      while (current !== null && current.left !== null) current = current.left;
      return current;
    }

    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.delete(root.left, value);
    } else if (root.data < value) {
      root.right = this.delete(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }

      const successor = findSuccessor(root);
      root.data = successor.data;
      root.right = this.delete(root.right, successor.data);
    }

    return root;
  }

  levelOrderForEach(callback) {
    try {
      if (!callback) throw new Error("callback is required");

      const queue = [this.root];

      const traverse = () => {
        if (queue.length === 0) return;

        const current = queue.shift();

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);

        callback(current);

        traverse();
      };
    } catch (error) {
      console.log(error);
    }
  }

  find(root = this.root, value) {
    if (root === null) {
      return "value not found";
    }

    if (root.data === value) {
      return root;
    } else if (root.data < value) {
      return this.find(root.right, value);
    } else if (root.data > value) {
      return this.find(root.left, value);
    }
  }

  height(root = this.root) {
    if (root === null) {
      return null;
    }

    if (root.left === null && root.right === null) {
      return 0;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    const target = this.find(root, value);
    if (target === "value not found") {
      return null;
    }

    const recursiveStep = (current, depth = 0) => {
      if (!current) {
        return null;
      }

      if (current === target) {
        return depth;
      }

      const left = recursiveStep(current.left, depth + 1);
      if (left !== null) {
        return left;
      }

      const right = recursiveStep(current.right, depth + 1);
      if (right !== null) {
        return right;
      }

      return null;
    };

    return recursiveStep(this.root);
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
