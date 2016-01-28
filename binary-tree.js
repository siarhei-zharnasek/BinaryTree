'use strict';

class BinaryTree {
	constructor() {
		this.root = null;
	}

	insert(data) {
		var currentVal;
		if (this.root === null) {
			this.root = new Node(data);
			return;
		} else currentVal = this.root;
		while (true) {
			if (data < currentVal.data) {
				if (currentVal.left === null) {
					currentVal.left = new Node(data);
					break;
				} else currentVal = currentVal.left;
			} else {
				if (currentVal.right === null) {
					currentVal.right = new Node(data);
					break;
				} else currentVal = currentVal.right;
			}
		}
	}

	contains(data) {
		if (this.root === null) return false;
		if (this.root.data === data) return true;
		var currentVal = this.root,
			count = false;
		while (true) {
			if (data === currentVal.data) {
				count = true;
				break;
			}
			else if (data < currentVal.data && currentVal.left) { 
				currentVal = currentVal.left;
			}
			else if (data > currentVal.data && currentVal.right) {
				currentVal = currentVal.right;
			} else break;
		}
		return count;
	}

	remove(data) {
		if (!this.contains(data)) return;
		var parent,
			currentVal = this.root,
			children,
			replaceData,
			replaceParData;
		while (true) {
			if (data < currentVal.data) {
				parent = currentVal;
				currentVal = currentVal.left;
			} else if (data > currentVal.data) {
				parent = currentVal;
				currentVal = currentVal.right;
			} else break;
		}
		children = (currentVal.left === null ? 0 : 1) + (currentVal.right === null ? 0 : 1);
		if (!parent) {
			if (children === 0) {
				this.root = null;
				return;
			} else if (children === 1) {
				this.root = (currentVal.left === 0 ? currentVal.right : currentVal.left);
				return;
			} else {
				currentVal = this.root.left;
				replaceData = currentVal.right;
				while (true) {
					if (replaceData.right) {
						currentVal = replaceData;
						replaceData = replaceData.right;
					} else break;
				}
				replaceData.right = this.root.right;
				this.root = currentVal;
			}
		} else {
			if (children === 0) {
				currentVal.data < parent.data ? parent.left = null : parent.right = null;
				return;
			} else if (children === 1) {
				if (currentVal.data < parent.data) {
					currentVal = (currentVal.left === null ? currentVal.right : currentVal.left);
					parent.left = currentVal;
					return;
				} else {
					currentVal = (currentVal.left === null ? currentVal.right : currentVal.left);
					parent.right = currentVal;
					return;
				}
			} else {
				replaceData = currentVal.right;
				while (true) {
					if (replaceData.right) {
						replaceParData = replaceData;
						replaceData = replaceData.right;
					} else break;
				}
				replaceData.left = currentVal.left;
				currentVal = replaceData;
				this.root.right = replaceData;
			}
		}
	}

	size() {
		if (this.isEmpty()) return 0;
		if (this.root && !this.root.left && !this.root.right) return 1;
		var max = this.root.data,
			currentVal = this.root;
		while (true) {
			if (currentVal.right) {
				currentVal = currentVal.right;
				max = currentVal.data;
				continue;
			} else break;
		}
		for (var i = 1, count = 0; i <= max; i++) {
			if (this.contains(i)) count++;
			else continue;
		}
		return count;
	}

	isEmpty() {
		if (this.root === null) return true;
		else return false;
	}
}
