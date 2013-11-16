#lru-cache-js

A JavaScript implementation of an LRU cache.  The cache is a hashmap of key-value pairs, where the key object must
implement hashCode() and equals() methods.

## Interface
lru-cache-js implements the following interface:

``` js
/**
 * Returns the object associated with the given key in the cache, or null if non was found
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

```

## Install
To install the lru-cache-js module as a dependency for your node app, execute the following command in the top directory of your node project:

``` bash
npm install lru-cache-js --save
```


## Interface
lru-cache-js implements the following methods:
1.

## Example
To use lru-cache-js, follow this simple example: