/**
 * Created by aismael on 11/12/13.
 */

'use strict';

var HashMap = require('../lib/hashmap');


var testMap = new HashMap;


var TestKey = function (keyObj) {
    this.keyObj = keyObj;
};

TestKey.prototype.hashCode = function () {
    return this.keyObj.toString();
};

TestKey.prototype.equals = function (anotherKey) {
    if (anotherKey && (typeof anotherKey.hashCode == 'function')) {
        return this.hashCode() == anotherKey.hashCode();
    } else {
        return false;
    }
};


var testKey = new TestKey('this is a test key!!!');

var testKey2 = new TestKey('this is a test key number 2!!!');

testMap.put(testKey, "hello !!!!");
testMap.put(testKey2, "hello number 2!!!!");

console.log(testMap.get(testKey));
console.log(testMap.get(testKey2));

testMap.put(testKey, "hello number 1!!!!");
console.log(testMap.get(testKey));
console.log(testMap.get(testKey2));

for (var i = 0; i < 100000; i++) {
    testKey = new TestKey('this is a test key number ' + i);
    testMap.put(testKey, "hello value number " + i);
}

console.log('map size= ' + testMap.size());


testKey = new TestKey('this is a test key number ' + 223);
testMap.put(testKey, "hello value number " + 224);
console.log('map size= ' + testMap.size());

console.log(testMap.get(testKey));
console.log(testMap.remove(testKey));
console.log('map size= ' + testMap.size());

console.log(testMap.get(testKey));

console.log('finished');
