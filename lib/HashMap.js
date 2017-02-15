/**
 * See included License.
 * Created by aismael on 11/12/13.
 */

"use strict";

class HashMap {
    constructor() {
        this.buckets = {};
        this.currentSize = 0;

        this.put = this.put.bind(this);
        this.get = this.get.bind(this);
        this.remove = this.remove.bind(this);
        this.size = this.size.bind(this);
        this.clear = this.clear.bind(this);

    }

    /**
     *
     */
    put(key, value) {

        let hashCode = key.hashCode();
        let retValue = null;

        if (value == null) {
            throw new Error("value cannot be null!");
        }

        let bucket = this.buckets[hashCode];

        if (!bucket) {
            bucket = new Array();
            this.buckets[hashCode] = bucket;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key.equals(key)) {
                retValue = bucket[i].value;
                bucket[i].value = value;
                return retValue;
            }
        }

        this.currentSize++;

        bucket.push({key: key, value: value});
        return null;
    }

    /**
     *
     * @param key
     * @returns {*}
     */
    get(key) {
        let hashCode = key.hashCode();

        let bucket = this.buckets[hashCode];

        if (!bucket) {
            return null;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key.equals(key)) {
                return bucket[i].value;
            }
        }

        return null;
    }

    /**
     *
     * @param key
     * @returns {*}
     */
    remove(key) {
        let hashCode = key.hashCode();
        let retValue = null;

        let bucket = this.buckets[hashCode];

        if (!bucket) {
            return retValue;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key.equals(key)) {
                retValue = bucket[i].value;
                bucket.splice(i, 1);
                break;
            }
        }

        if (bucket.length == 0) {
            delete this.buckets[hashCode];
        }

        if (retValue != null) {
            this.currentSize--;
        }

        return retValue;
    }

    /**
     *
     * @returns {number}
     */
    size() {
        return this.currentSize;
    }

    /**
     *
     */
    clear() {
        this.buckets = {};
        this.currentSize = 0;
    }
}

module.exports = HashMap;
