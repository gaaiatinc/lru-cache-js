/**
 *  License and documentation TBD
 */

'use strict';

var HashMap = require('./hashmap');

/**
 *
 */
(function () {

    /**
     *
     * @param maxSize
     * @constructor
     */
    function LRUHashMap(maxSize) {
        this.maxSize = maxSize;
        this.hashMap = new HashMap;
        this.mapTail = null;
        this.mapHead = null;
    }

    /**
     *
     * @param key
     * @returns {null}
     */
    LRUHashMap.prototype.get = function (key) {
        var tempNode = this.hashMap.get(key);

        if (tempNode != null) {
            this.detachFromList(tempNode);
            this.insertInList(tempNode);

            return tempNode.value;
        }
        return null;
    };

    /**
     *
     * @param key
     * @param value
     * @returns {null}
     */
    LRUHashMap.prototype.put = function (key, value) {
        var tempNode = this.hashMap.get(key);
        var retVal = null;

        if (tempNode != null) {
            retVal = tempNode.value;
            tempNode.value = value;
            this.detachFromList(tempNode);
        } else {

            if (this.hashMap.size() >= this.maxSize) {
                this.hashMap.remove(this.mapTail.key);
                this.detachFromList(this.mapTail);
            }

            tempNode = new WrapperObject(key, value);
            this.hashMap.put(key, tempNode);
        }


        this.insertInList(tempNode);

        return retVal;
    };

    /**
     *
     * @returns {number}
     */
    LRUHashMap.prototype.size = function () {
        return this.hashMap.size();
    };


    /**
     *
     * @param key
     * @param value
     * @constructor
     */
    function WrapperObject(key, value) {
        this.nextNode = null;
        this.previousNode = null;
        this.key = key;
        this.value = value;
    }

    /**
     *
     * @param aNode
     */
    LRUHashMap.prototype.detachFromList = function (aNode) {
        var previousNodePtr = aNode.previousNode;
        var nextNodePtr = aNode.nextNode;

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

    };


    /**
     *
     * @param aNode
     */
    LRUHashMap.prototype.insertInList = function (aNode) {
        if (this.mapHead != null) {
            this.mapHead.previousNode = aNode;
        }

        aNode.previousNode = null;
        aNode.nextNode = this.mapHead;
        this.mapHead = aNode;

        if (this.mapTail == null) {
            this.mapTail = aNode;
        }
    };


    /**
     *
     * @param key
     * @returns {*}
     */
    LRUHashMap.prototype.remove = function (key) {
        var tempNode = this.hashMap.remove(key);
        var retVal = null;
        if (tempNode != null) {
            retVal = tempNode.value;
            this.detachFromList(tempNode);
        }

        return retVal;
    };


    /**
     *
     */
    LRUHashMap.prototype.clear = function () {
        this.hashMap.clear();
        this.mapTail = null;
        this.mapHead = null;
    };

    /**
     *
     * @param maxSize
     * @returns {LRUHashMap}
     */
    function createCache(maxSize) {
        return new LRUHashMap(maxSize);
    }


    module.exports = createCache;

}());
