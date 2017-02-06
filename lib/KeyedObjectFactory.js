/**
 * Created by Ali Ismael on 1/5/2017.
 */
"use strict";

let hashEngine = require("object-hash");

const defaultOptions = {
    algorithm: "sha1",
    excludeValues: false,
    encoding: "hex",
    ignoreUnknown: true,
    // replacer optional function that replaces values before hashing. default: accept all values
    respectFunctionProperties: false, // {true|false} Whether properties on functions are considered when hashing. default: true
    respectFunctionNames: false, // {true|false} consider name property of functions for hashing. default: true
    respectType: false // {true|false} Whether special type attributes (.prototype, .__proto__, .constructor) are hashed. default: true
    // unorderedArrays {true|false} Sort all arrays using before hashing. Note that this affects all collections, i.e. including typed arrays, Sets, Maps, etc. default: false
    // unorderedSets {true|false} Sort Set and Map instances before hashing, i.e. make hash(new Set([1, 2])) == hash(new Set([2, 1])) return true. default: true
};

/**
 *
 */
class KeyedObject {

    /**
     *
     */
    constructor(anObject, options) {
        this.anObject = anObject;
        this.options = options || defaultOptions;

        this.objHashString = hashEngine(this.anObject, this.options);
        this.hashCode = this.hashCode.bind(this);
        this.equals = this.equals.bind(this);
    }

    hashCode() {
        return this.objHashString;
    }

    equals(anotherKey) {
        if (anotherKey && (typeof anotherKey.hashCode === "function")) {
            return this.hashCode() == anotherKey.hashCode();
        } else {
            return false;
        }
    }
}

/**
 *
 * @param anObject
 * @returns {StringKey}
 */
function createKey(anObject) {
    if ((typeof anObject.hashCode !== "function") || (typeof anObject.equals !== "function")) {
        return new KeyedObject(anObject);
    } else {
        return anObject;
    }
}

module.exports = {
    createKey: createKey
};
