#lru-cache-js

A JavaScript implementation of an LRU cache.  The cache is a hashmap of key-value pairs, where the key object must
implement hashCode() and equals() methods.

## Interface
lru-cache-js node module exports a function which is used to create an LRU cache.  The exported function takes a
single mandatory argument that indicates the maximum capacity of the lru cache, and returns an instance of an lru cache.
The returned lru cache implements  the following interface:

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
The key object used with the interface methods above must implement the following methods:
* hashCode(): The implementation of this method must return a value which can be of any JavaScript type (numbers, strings, etc.).
 This method must guarantee that for two key objects with at least one different attribute, the returned hash codes are different.
* equals(otherKey): The implementation of this method must satisfy the following conditions:
    * key1.equals(key2) returns the same value as key2.equals(key1), and
    * if key1.equals(key2) returns true, then key1.hashCode() returns the same value as key2.hashCode().

If the key object requirements above are not satisfied, the interface methods will throw an error.


## Install
To install the lru-cache-js module as a dependency for your node app, execute the following command in the top directory of your node project:

``` bash
npm install lru-cache-js --save
```

## Example
To use lru-cache-js, follow this simple example:

```js
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
