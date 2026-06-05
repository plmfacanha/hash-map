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

  get(key) {
    const bucket = this._hash(key); // hash the key to find which bucket its stored in

    if (bucket < 0 || bucket >= this.buckets.length) {
      throw new Error("Trying to access bucket out of bounds");
    }

    const list = this.buckets[bucket];

    if (list === null) return;

    let curr = list.head;

    while (curr !== null) {
      if (curr.data.name === key) {
        return curr.data.occupation;
      }

      curr = curr.next;
    }

    return null;
  }

  has(key) {
    let isTrue = this.get(key);

    return isTrue ? true : false;
  }

  remove(key) {
    const bucket = this._hash(key);

    if (bucket < 0 || bucket >= this.buckets.length) {
      throw new Error("Trying to access bucket out of bounds");
    }

    const list = this.buckets[bucket];

    if (list === null) return false;

    let head = list.head;
    let tail = list.tail;

    if (head.data.name === key && tail.data.name === key) {
      list.head = null;
      list.tail = null;
      return true;
    }

    if (head.data.name === key) {
      list.head = list.head.next;
      return true;
    }

    // considering the list.head is not the same as key
    let prev = head;
    let curr = head.next;

    while (curr !== null) {
      if (curr.data.name === key) {
        prev.next = curr.next;
        if (curr === tail) {
          list.tail = prev;
        }
        return true;
      }

      prev = prev.next;
      curr = curr.next;
    }

    return false;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; ++i) {
      let currList = this.buckets[i];

      if (currList !== null) {
        let currNode = currList.head;

        while (currNode !== null) {
          ++count;
          currNode = currNode.next;
        }
      }
    }

    return count;
  }

  clear() {
    this.buckets.fill(null);
  }

  keys() {
    let arr = [];

    for (let i = 0; i < this.buckets.length; ++i) {
      let currList = this.buckets[i];

      if (currList !== null) {
        let currNode = currList.head;

        while (currNode !== null) {
          arr.push(currNode.data.name);

          currNode = currNode.next;
        }
      }
    }

    return arr;
  }
}

const hashMap = new HashMap();

hashMap.set("pedro", "student");
hashMap.set("carlos", "student");
hashMap.set("lena", "student");
console.log(hashMap.remove("lena"));
hashMap.set("marlon", "policeman");
console.log(hashMap.length());
console.log(hashMap.keys());
