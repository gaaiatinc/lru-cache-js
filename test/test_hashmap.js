/**
 * See included License (MIT License).
 * Created by aismael on 11/12/13.
 */

'use strict';

var HashMap = require('../lib/hashmap'),
    assert = require('assert');


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
describe('hashmap', function () {

    var testMap;

    before(function () {
        //
        testMap = new HashMap();
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

        it('should finish as fas as possible', function () {

            var test_cycles = 100000;


            var testKey = new TestKey('this is a test key!!!');

            var testKey2 = new TestKey('this is a test key number 2!!!');
            var testObj1 = 'hello !!!!';
            var testObj2 = 'hello number 2!!!!';

            testMap.put(testKey, testObj1);
            testMap.put(testKey2, testObj2);

            assert.equal(testMap.get(testKey), testObj1, 'correct retrieval of objects from hashmap');
            assert.equal(testMap.get(testKey2), testObj2), 'correct retrieval of objects from hashmap';

            assert.equal(testMap.put(testKey, testObj2), testObj1, 'correct retrieval of overridden object in hashmap');
            assert.equal(testMap.get(testKey), testObj2, 'correct retrieval of overriding object in hashmap');
            assert.equal(testMap.get(testKey2), testObj2, 'verification of preexisting object in hashmap');

            for (var i = 0; i < test_cycles; i++) {
                testKey = new TestKey('this is a test key number ' + i);
                testMap.put(testKey, "hello value number " + i);
            }

            assert.equal(testMap.size(), test_cycles + 2, 'verification of hashmap size after tests');

            testKey = new TestKey('this is a test key number ' + 223);

            var testObj3 = "hello value number " + 224;
            testMap.put(testKey, testObj3);
            assert.equal(testMap.size(), test_cycles + 2, 'second verification of hashmap size after tests');

            assert.equal(testMap.get(testKey), testObj3, 'retrival of objects after stress test');

            assert.equal(testMap.remove(testKey), testObj3, 'verification of object removal from cache');

            assert.equal(testMap.size(), test_cycles + 1, 'verification of hashmap size after object removal');

            testMap.clear();
            assert.equal(testMap.size(), 0, 'verification of hashmap size after clear');
        });
    });
});
