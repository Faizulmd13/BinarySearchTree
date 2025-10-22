import { Tree } from "./Tree.js";

// Utility function for clear console separation
function printSection(title) {
  console.log("\n==== " + title + " ====");
}

// Callback for traversal
function logger(node) {
  process.stdout.write(node.data + " ");
}

// Pretty-print helper for visualizing the tree
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) return;
  if (node.right !== null)
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null)
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
}

// Generate test data
const randomArray = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

const tree = new Tree(randomArray());

// === 1. Initial tree ===
printSection("Initial Balanced Tree");
prettyPrint(tree.root);

// === 2. Traversals ===
printSection("Traversals");
console.log("Level Order:");
tree.levelOrderForEach(logger);
console.log("\nInorder:");
tree.inOrderForEach(logger);
console.log("\nPreorder:");
tree.preOrderForEach(logger);
console.log("\nPostorder:");
tree.postOrderForEach(logger);
console.log("\n");

// === 3. Insert operations ===
printSection("Insert Operations");
tree.insert(tree.root, 65);
tree.insert(tree.root, 69);
tree.insert(tree.root, 55);
prettyPrint(tree.root);

// === 4. Delete operation ===
printSection("Delete Operation");
tree.delete(tree.root, 13);
prettyPrint(tree.root);

// === 5. Find specific nodes ===
printSection("Find Nodes");
console.log("Find 70 ->", tree.find(tree.root, 70));
console.log("Find 13 (deleted) ->", tree.find(tree.root, 13));

// === 6. Height and depth ===
printSection("Height and Depth");
console.log("Height of entire tree:", tree.height(tree.root));
console.log("Depth of node 70:", tree.depth(70));

// === 7. Balance check ===
printSection("Check Balance");
console.log("Is balanced?", tree.isBalanced());

// === 8. Rebalance if needed ===
printSection("Rebalance Tree");
if (!tree.isBalanced()) {
  console.log("Tree not balanced. Rebalancing...");
  tree.rebalance();
  prettyPrint(tree.root);
} else {
  console.log("Tree already balanced.");
}

// === 9. Verify rebalance ===
printSection("Traversals After Rebalance");
console.log("Inorder:");
tree.inOrderForEach(logger);
console.log("\nLevel Order:");
tree.levelOrderForEach(logger);
console.log();
