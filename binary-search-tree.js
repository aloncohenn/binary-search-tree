class BinarySearchTree {
  constructor(value = null, parent = null) {
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    // check if tree is empty, if so then set root node with value
    if (this.value === null) {
      this.value = value;
    }

    // if the tree is not empty, insert the value in its correct location
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BinarySearchTree(value, this);
      } else {
        this.left.insert(value);
      }
    }

    if (value > this.value) {
      if (this.right === null) {
        this.right = new BinarySearchTree(value, this);
      } else {
        this.right.insert(value);
      }
    }
  }

  find(value) {
    if ((this.value = value)) {
      return this.value;
    } else if (value < this.value && this.left) {
      this.left.find(value);
    } else if (value > this.value && this.right) {
      this.right.find(value);
    } else {
      throw new Error('node value not found');
    }
  }

  remove(value) {
    if (this.value === value) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.value = successor.value;
        successor.remove(successor.value);
      } else if (this.left) {
        /* If the node only has a left child, 
         then you replace the node with its left child */
        this._replaceWith(this.left);
      } else if (this.right) {
        /* And similarly if the node only has a right child 
         then you replace it with its right child */
        this._replaceWith(this.left);
      } else {
        /* If the node has no children then
         simply remove it and any references to it 
         by calling "this._replaceWith(null)" */
        this._replaceWith(null);
      }
    } else if (value < this.value && this.left) {
      this.left.remove(value);
    } else if (value > this.value && this.right) {
      this.right.remove(value);
    } else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}
