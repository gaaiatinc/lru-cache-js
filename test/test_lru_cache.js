/**
 * See included License (MIT License).
 * Created by aismael on 11/12/13.
 */

'use strict';

var LRUCache = require('../lib/lru_cache');

var assert = require('assert');

/**
 *
 * @param keyObj
 * @constructor
 */
var TestKey = function (keyObj) {
    this.keyObj = keyObj;
};

/**
 *
 * @returns {string}
 */
TestKey.prototype.hashCode = function () {
    return this.keyObj.toString();
};

/**
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
 *
 */
describe('lru-cache-js', function () {

    var testMap;
    var cache_capacity = 100000;
    var numOfEvictions = 0;

    function evictionNotify(evicted) {
        numOfEvictions++;
    }

    before(function () {
        //
        testMap = LRUCache(cache_capacity, evictionNotify);
    });


    /**
     *
     */
    after(function () {

    });

    /**
     *
     */
    beforeEach(function () {

    });

    /**
     *
     */
    afterEach(function () {

    });


    /**
     *
     */
    describe('Performance test', function () {

        it('should run without error', function () {

            var num_of_tests = 1000000;

            var testObj = 'this is a test key number ';

            var startTime = new Date().getTime();

            var testKey;

            for (var i = 0; i < num_of_tests; i++) {
                testKey = new TestKey(testObj + i);
                testMap.put(testKey, testObj + i);

                if ((i % 100) == 0) {
                    testKey = new TestKey(testObj + 99);
                    testMap.get(testKey);
                }
            }

            assert.equal(testMap.size(), cache_capacity, 'max cache capacity verification');


            testKey = new TestKey(testObj + 999990);
            assert.equal(testObj + 999990, testMap.get(testKey), 'verification of object retrieval after stress test');

            testMap.put(testKey, testObj + 224);
            assert.equal(testMap.get(testKey), testObj + 224, 'second verificaiton object retrieval after stress test');

            testKey = new TestKey(testObj + 223);
            assert.equal(testMap.get(testKey), null, 'verificaiton of old object eviction upon cache capacity exhaustion.');

            testKey = new TestKey(testObj + 99);
            assert.equal(testMap.get(testKey), testObj + 99, 'verification of LRU functionality');

            testMap.remove(testKey);
            console.log('tests performed in ' + (new Date().getTime() - startTime) + " ms");

            console.log('numOfEvictions = ' + numOfEvictions);
            assert.equal(testMap.size(), (cache_capacity - 1), 'end cache size verification!');
        });
    });
});
