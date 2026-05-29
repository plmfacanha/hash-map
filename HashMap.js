class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.bucket = new Array(this.capacity).fill(null);
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
    let index = this._hash(key); // find which index in the bucket array the value is

    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.bucket[index] === null) {
      this.bucket[index] = value;
    } else {
      const head = this.bucket[index];
    }
  }
}

const hashMap = new HashMap();
