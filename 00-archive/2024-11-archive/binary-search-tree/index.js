let input = [10,7,14,20,1,5,8]

class Leaf {

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function insert_leaf_to_tree(root, number) {

    if( number < root.value ) {
        if(null == root.left) {
            root.left = new Leaf(number)
        } else {
            insert_leaf_to_tree(root.left, number)
        }
    }

    if( number >= root.value) {
        if(null == root.right) {
            root.right = new Leaf(number)
        } else {
            insert_leaf_to_tree(root.right, number)
        } 
    }
}

let root = null;

for(let i=0; i < input.length; i++) {
    if(i == 0) {
        root = new Leaf(input[i])
    } else {
        insert_leaf_to_tree(root, input[i])
    }
}

console.log(root)
