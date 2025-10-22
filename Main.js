import { Tree } from "./Tree.js";

const randomArray = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

const test = new Tree([0, 13, 19, 30, 38, 60, 70, 78, 90, 100]); //randomArray()
prettyPrint(test.root);

test.insert(test.root, 69);
prettyPrint(test.root);

test.delete(test.root, 69);
prettyPrint(test.root);

test.insert(test.root, 65);
prettyPrint(test.root);

test.delete(test.root, 13);
prettyPrint(test.root);
