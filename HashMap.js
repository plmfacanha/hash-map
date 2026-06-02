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

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.bucket[index] === null) {
      // TODO: implement linkedlist where head and tail would be a new node with the value passed in
    } else {
      // update the tail of the linked list with the new Node
    }
  }
}

const hashMap = new HashMap();
