/**
 * See included License.
 * Created by aismael on 11/12/13.
 */

"use strict";

let HashMap = require("./HashMap"),
    KeyedObjectFactory = require("./KeyedObjectFactory");

class LRUCache {
    constructor(maxSize, evictionCallback) {
        this.maxSize = maxSize || 1000;
        this.hashMap = new HashMap();
        this.mapTail = null;
        this.mapHead = null;
        this.evictionCallback = evictionCallback;

        this.get = this.get.bind(this);
        this.peek = this.peek.bind(this);
        this.put = this.put.bind(this);
        this.size = this.size.bind(this);
        this.detachFromList = this.detachFromList.bind(this);
        this.insertInList = this.insertInList.bind(this);
        this.remove = this.remove.bind(this);
        this.clear = this.clear.bind(this);

    }

    /**
     *
     * @param key
     * @returns {null}
     */
    get(key) {
        key = KeyedObjectFactory.createKey(key);

        let tempNode = this.hashMap.get(key);

        if (tempNode != null) {
            this.detachFromList(tempNode);
            this.insertInList(tempNode);

            return tempNode.value;
        }
        return null;
    }

    /**
     *
     * @param key
     * @returns {null}
     */
    peek(key) {
        key = KeyedObjectFactory.createKey(key);

        return this.hashMap.get(key);
    }

    /**
     *
     * @param key
     * @param value
     * @returns {null}
     */
    put(key, value) {
        key = KeyedObjectFactory.createKey(key);

        let tempNode = this.hashMap.get(key);
        let retVal = null;

        if (tempNode != null) {
            retVal = tempNode.value;
            tempNode.value = value;
            this.detachFromList(tempNode);
        } else {
            if (this.hashMap.size() >= this.maxSize) {
                let oldTailValue = this.mapTail.value;

                this.hashMap.remove(this.mapTail.key);
                this.detachFromList(this.mapTail);

                if (typeof this.evictionCallback == "function") {
                    this.evictionCallback(oldTailValue);
                }
            }

            tempNode = {
                nextNode: null,
                previousNode: null,
                key,
                value
            };

            this.hashMap.put(key, tempNode);
        }

        this.insertInList(tempNode);

        return retVal;
    }

    /**
     *
     * @returns {number}
     */
    size() {
        return this.hashMap.size();
    }

    /**
     *
     * @param aNode
     */
    detachFromList(aNode) {
        let previousNodePtr = aNode.previousNode;
        let nextNodePtr = aNode.nextNode;

        if (previousNodePtr != null) {
            previousNodePtr.nextNode = nextNodePtr;
            if (nextNodePtr == null) {
                //update the tail
                this.mapTail = previousNodePtr;
            }
        } else {
            this.mapHead = nextNodePtr;
        }

        if (nextNodePtr != null) {
            nextNodePtr.previousNode = previousNodePtr;
            if (previousNodePtr == null) {
                //update the head
                this.mapHead = nextNodePtr;
            }
        } else {
            this.mapTail = previousNodePtr;
        }

        aNode.nextNode = null;
        aNode.previousNode = null;

    }

    /**
     *
     * @param aNode
     */
    insertInList(aNode) {
        if (this.mapHead != null) {
            this.mapHead.previousNode = aNode;
        }

        aNode.previousNode = null;
        aNode.nextNode = this.mapHead;
        this.mapHead = aNode;

        if (this.mapTail == null) {
            this.mapTail = aNode;
        }
    }

    /**
     *
     * @param key
     * @returns {*}
     */
    remove(key) {
        key = KeyedObjectFactory.createKey(key);

        let tempNode = this.hashMap.remove(key);
        let retVal = null;
        if (tempNode != null) {
            retVal = tempNode.value;
            this.detachFromList(tempNode);
        }

        return retVal;
    }

    /**
     *
     */
    clear() {
        while (this.mapTail !== null) {
            let oldTailValue = this.remove(this.mapTail.key);

            if (oldTailValue && (typeof this.evictionCallback == "function")) {
                this.evictionCallback(oldTailValue);
            }
        }

        this.hashMap.clear();
        this.mapTail = null;
        this.mapHead = null;
    }
}

module.exports = LRUCache;
