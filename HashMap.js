import Node from "./Node.js";
import LinkedList from "./LinkedList.js";
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
    let bucket = this._hash(key); // find in which array index (bucket) the node will be stored

    if (bucket < 0 || bucket >= this.buckets.length) {
      throw new Error("Trying to access bucket out of bounds");
    }

    const data = {
      name: key,
      occupation: value,
    };
    const newNode = new Node(data);

    if (this.buckets[bucket] === null) {
      const list = new LinkedList();

      list.head = newNode;
      list.tail = newNode;
      this.buckets[bucket] = list;
    } else {
      const list = this.buckets[bucket];

      list.tail.next = newNode;
      list.tail = newNode;
    }
  }
}

const hashMap = new HashMap();

hashMap.set("pedro", "student");
hashMap.set("carlos", "artist");
hashMap.set("lucas", "artist");
