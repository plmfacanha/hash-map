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

      let currNode = list.head;

      while (currNode !== null) {
        if (currNode.data.name === newNode.data.name) {
          currNode.data.occupation = newNode.data.occupation;
          return;
        }
        currNode = currNode.next;
      }

      list.tail.next = newNode;
      list.tail = newNode;
    }

    if (this.length() > this.loadFactor * this.capacity) {
      this.capacity *= 2;
      const oldBuckets = this.buckets;
      this.buckets = new Array(this.capacity).fill(null);

      for (const bucket of oldBuckets) {
        if (bucket !== null) {
          let currNode = bucket.head;

          while (currNode !== null) {
            this.set(currNode.data.name, currNode.data.occupation);
            currNode = currNode.next;
          }
        }
      }
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

  values() {
    let arr = [];

    for (let i = 0; i < this.buckets.length; ++i) {
      let currList = this.buckets[i];

      if (currList !== null) {
        let currNode = currList.head;

        while (currNode !== null) {
          arr.push(currNode.data.occupation);

          currNode = currNode.next;
        }
      }
    }

    return arr;
  }

  entries() {
    let arr = [];

    for (let i = 0; i < this.buckets.length; ++i) {
      let currList = this.buckets[i];

      if (currList !== null) {
        let currNode = currList.head;

        while (currNode !== null) {
          arr.push([currNode.data.name, currNode.data.occupation]);

          currNode = currNode.next;
        }
      }
    }

    return arr;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("jacket", "red");
test.set("kite", "golden");
test.set("lion", "pink");

console.log(test.length());

test.set("moon", "silver");
console.log(test);
