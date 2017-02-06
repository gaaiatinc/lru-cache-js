# lru-cache-js

A JavaScript implementation of an LRU cache.  The cache is a hashmap of key-value pairs, where the key object may provide custom implementation of hashCode() and equals() methods.

## Interface
lru-cache-js node module exports a class implementing an LRU cache.  The class constructor takes two optional arguments:

```js
let LRUCache = require("lru-cache-js");
let lruCachInstance = new LRUCache(maxSize, evictionCallback);
```
The optional constructor arguments are:
* maxSize: (default 1000) the maximum size of the LRU cache.  When more objects are inserted into the LRU cache than _maxSize_, the least recently used object in the cache will be evicted.

* evictionCallback: a function that will be called when the tail object in the cache (least recently used) is being evicted.  The evicted object is passed as an argument to the evictionCallback function.


single mandatory argument that indicates the maximum capacity of the LRU cache.
The LRU cache implements the following interface:

``` js
/**
 * Returns the value object associated with the given key in the cache, or null if none was found
 */
get(key)

/**
 * Adds the object-key association into the cache.  If a previous object was associated with the given key in the
 * cache, it is replaced with the new one passed to the method, and the replaced object is returned.  Otherwise, the
 * method returns null.
 */
put(key, object)


/**
 * If the cache contains the key, it is removed along with the object associated with the key, and the value object is
 * returned. Otherwise, the method simply returns null.
 */
remove(key)


/**
 * Clears all the contents of the cache.
 */
clear()

/**
 * Returns the current size of the cache (the number of key-value pairs in the cache).
 */
size()

```


## Key Requirements
If the key object passed to any of the LRU cache methods does not have its own member methods hashCode() and equals(), the LRUCache will wrap the key object with a class that implements the two necessary methods (hashCode() calculates a SHA1 hash of the key object using the _object-hash_ module).

The key object used with the interface methods above may implement its own member methods for hashCode() and equals():
* hashCode(): The implementation of this method must return a value which can be of any JavaScript type (numbers, strings, etc.).
 This method must guarantee that for two key objects with at least one different attribute, the returned hash codes are different.
* equals(otherKey): The implementation of this method must satisfy the following conditions:
    * key1.equals(key2) returns the same value as key2.equals(key1), and
    * if key1.equals(key2) returns true, then key1.hashCode() returns the same value as key2.hashCode().

## Install
To install the lru-cache-js module as a dependency for your node app, execute the following command in the top directory of your node project:

``` bash
npm install lru-cache-js --save
```

## Example
To use lru-cache-js, follow this simple example:

```js
"use strict";

/**
 * require the module in your app:
 */
 var LRUCacheFactory = require('lru-cache-js');

 . . .
 . . .

 /**
  * An object to be used as a key in the cache.
  *
  * @param keyObj
  * @constructor
  */
 var TestKey = function (keyObj) {
     this.keyObj = keyObj;
 };

 /**
  * Add the hashCode to the key object's prototype.
  * In this simple example, the hashCode simply returns a string value of the key.  However, for performance optimization,
  * it is strongly recommended that you implement a hashing algorithm which returns integers instead.

  * @returns {string}
  */
 TestKey.prototype.hashCode = function () {
     return this.keyObj.toString();
 };

 /**
  * This is simple implementation of the equals() method, which satisfies the conditions mentioned above.
  *
  * @param anotherKey
  * @returns {boolean}
  */
 TestKey.prototype.equals = function (anotherKey) {
     if (anotherKey && (typeof anotherKey.hashCode == 'function')) {
         return this.hashCode() == anotherKey.hashCode();
     } else {
         return false;
     }
 };


 /**
  * Create an instance of the cache with a maximum capacity of 100000 entries:
  */
  var testLRUCache = LRUCacheFactory( 100000 );

  var testKey = new TestKey('test object for a test key');

  testLRUCache.put( testKey, 'a test value to be associated with the test key in the cache');

```
