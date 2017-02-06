/**
 * See included License (MIT License).
 * Created by aismael on 11/12/13.
 */

"use strict";

let HashMap = require("../lib/HashMap"),
    KeyedObjectFactory = require("../lib/KeyedObjectFactory"),
    assert = require("assert");

/**
 *
 */
describe("hashmap", function() {

    let testMap;

    before(function() {
        //
        testMap = new HashMap();
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

        it("should finish as fas as possible", function() {
            this.timeout(10000);

            let test_cycles = 100000;

            let testKey = KeyedObjectFactory.createKey("this is a test key!!!");

            let testKey2 = KeyedObjectFactory.createKey("this is a test key number 2!!!");
            let testObj1 = "hello !!!!";
            let testObj2 = "hello number 2!!!!";

            testMap.put(testKey, testObj1);
            testMap.put(testKey2, testObj2);

            assert.equal(testMap.get(testKey), testObj1, "correct retrieval of objects from hashmap");
            assert.equal(testMap.get(testKey2), testObj2, "correct retrieval of objects from hashmap");

            assert.equal(testMap.put(testKey, testObj2), testObj1, "correct retrieval of overridden object in hashmap");
            assert.equal(testMap.get(testKey), testObj2, "correct retrieval of overriding object in hashmap");
            assert.equal(testMap.get(testKey2), testObj2, "verification of preexisting object in hashmap");

            for (let i = 0; i < test_cycles; i++) {
                testKey = KeyedObjectFactory.createKey("this is a test key number " + i);
                testMap.put(testKey, "hello value number " + i);
            }

            assert.equal(testMap.size(), test_cycles + 2, "verification of hashmap size after tests");

            testKey = KeyedObjectFactory.createKey("this is a test key number " + 223);

            let testObj3 = "hello value number " + 224;
            testMap.put(testKey, testObj3);
            assert.equal(testMap.size(), test_cycles + 2, "second verification of hashmap size after tests");

            assert.equal(testMap.get(testKey), testObj3, "retrival of objects after stress test");

            assert.equal(testMap.remove(testKey), testObj3, "verification of object removal from cache");

            assert.equal(testMap.size(), test_cycles + 1, "verification of hashmap size after object removal");

            testMap.clear();
            assert.equal(testMap.size(), 0, "verification of hashmap size after clear");
        });
    });
});
