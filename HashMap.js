import Node from "./Node.js";
class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null);
  }

  _hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this._hash(key); // find in which array index (bucket) the value will be

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const newNode = new Node(value);

    console.log(newNode);

    // if (this.bucket[index] === null) {
    // } else {
    //   // update the tail of the linked list with the new Node
    // }
  }
}

const hashMap = new HashMap();

hashMap.set("pedro", "student");
