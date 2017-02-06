/**
 * See included License (MIT License).
 * Created by aismael on 11/12/13.
 */

"use strict";

let LRUCache = require("../lib/LRUCache");

let assert = require("assert");


/**
 *
 */
describe("lru-cache-js", function() {

    let testMap;
    let cache_capacity = 100000;
    let numOfEvictions = 0;

    function evictionNotify(evicted) {
        numOfEvictions++;
    }

    before(function() {
        //
        testMap = new LRUCache(cache_capacity, evictionNotify);
    });

    /**
     *
     */
    after(function() {});

    /**
     *
     */
    beforeEach(function() {});

    /**
     *
     */
    afterEach(function() {});

    /**
     *
     */
    describe("Performance test", function() {
        this.timeout(0);

        it("should run without error", function() {

            let num_of_tests = 1000000;

            let testObj = "this is a test key number ";

            let startTime = new Date().getTime();

            let testKey;

            for (let i = 0; i < num_of_tests; i++) {
                testKey = (testObj + i);
                testMap.put(testKey, testObj + i);

                if ((i % 100) == 0) {
                    testKey = (testObj + 99);
                    testMap.get(testKey);
                }
            }

            assert.equal(testMap.size(), cache_capacity, "max cache capacity verification");

            testKey = (testObj + 999990);
            assert.equal(testObj + 999990, testMap.get(testKey), "verification of object retrieval after stress test");

            testMap.put(testKey, testObj + 224);
            assert.equal(testMap.get(testKey), testObj + 224, "second verificaiton object retrieval after stress test");

            testKey = (testObj + 223);
            assert.equal(testMap.get(testKey), null, "verificaiton of old object eviction upon cache capacity exhaustion.");

            testKey = (testObj + 99);
            assert.equal(testMap.get(testKey), testObj + 99, "verification of LRU functionality");

            testMap.remove(testKey);
            console.log("tests performed in " + (new Date().getTime() - startTime) + " ms");

            console.log("numOfEvictions = " + numOfEvictions);
            assert.equal(testMap.size(), (cache_capacity - 1), "end cache size verification!");
        });
    });
});
