/**
 *  License and documentation TBD
 */

'use strict';

(function () {

    /**
     *
     * @param key
     * @returns {*}
     */
    function getKeyHashCode(key) {

        if (!key || (typeof key.hashCode != 'function')) {
            throw new Error('key must provide hashCode() function!');
        }

        if (typeof key.equals != 'function') {
            throw new Error('key must provide equals() function!');
        }

        var hashCode = key.hashCode();
        if (!hashCode) {
            throw new Error('hashCode() generated erroneous value!');
        }

        return hashCode;
    }

    /**
     *
     * @constructor
     */
    function HashMap() {
        this.buckets = {};
        this.currentSize = 0;
    }


    /**
     *
     * @param key
     * @param value
     * @returns {*}
     */
    HashMap.prototype.put = function (key, value) {

        var hashCode = getKeyHashCode(key);
        var retValue = null;

        if (value == null) {
            throw new Error("value cannot be null!");
        }

        var bucket = this.buckets[hashCode];

        if (!bucket) {
            bucket = new Array();
            this.buckets[hashCode] = bucket;
        }

        for (var i = 0; i < bucket.length; i++) {
            if (bucket[i].key.equals(key)) {
                retValue = bucket[i].value;
                bucket[i].value = value;
                return retValue;
            }
        }

        this.currentSize++;

        bucket.push({key: key, value: value});
        return null;
    };


    /**
     *
     * @param key
     * @returns {*}
     */
    HashMap.prototype.get = function (key) {
        var hashCode = getKeyHashCode(key);

        var bucket = this.buckets[hashCode];

        if (!bucket) {
            return null;
        }

        for (var i = 0; i < bucket.length; i++) {
            if (bucket[i].key.equals(key)) {
                return bucket[i].value;
            }
        }

        return null;
    };


    /**
     *
     * @param key
     * @returns {*}
     */
    HashMap.prototype.remove = function (key) {
        var hashCode = getKeyHashCode(key);
        var retValue = null;

        var bucket = this.buckets[hashCode];

        if (!bucket) {
            return retValue;
        }

        for (var i = 0; i < bucket.length; i++) {
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
    };

    /**
     *
     * @returns {number}
     */
    HashMap.prototype.size = function () {
        return this.currentSize;
    };


    /**
     *
     */
    HashMap.prototype.clear = function () {
        this.buckets = {};
        this.currentSize = 0;
    };

    /**
     *
     * @type {Function}
     */
    module.exports = HashMap;

}());
